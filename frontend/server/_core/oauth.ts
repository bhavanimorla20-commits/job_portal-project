import { OAuth2Client } from "google-auth-library";
import { COOKIE_NAME, ONE_YEAR_MS, OAUTH_STATE_COOKIE, decodeOAuthState } from "@shared/const";
import { parse as parseCookieHeader } from "cookie";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    // CSRF guard: the nonce in `state` must match the one-time cookie that
    // startLogin set in the browser that began this login. An attacker can
    // forge `state`, but cannot plant this cookie in the victim's browser.
    const { nonce } = decodeOAuthState(state);
    const expectedNonce = parseCookieHeader(req.headers.cookie ?? "")[OAUTH_STATE_COOKIE];
    if (!nonce || nonce !== expectedNonce) {
      res.status(403).json({ error: "invalid oauth state" });
      return;
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/", secure: true, sameSite: "none" });

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });
      console.log("ENV.appId =", process.env.VITE_APP_ID);
      console.log("JWT_SECRET =", process.env.JWT_SECRET);
      console.log("Google User =", userInfo.openId);
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });

  app.post("/api/auth/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    // Save user
    //await db.upsertUser({
     //openId: payload.sub!,
     // name: payload.name ?? null,
      //email: payload.email ?? null,
      //loginMethod: "google",
      //lastSignedIn: new Date(),
    //});

    // Create session token
    console.log("JWT_SECRET =", process.env.JWT_SECRET);
    console.log("Google User =", payload.sub);

    const sessionToken = await sdk.createSessionToken(payload.sub!, {
      name: payload.name ?? "",
      expiresInMs: ONE_YEAR_MS,
    });

    // Set cookie
    res.cookie(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: ONE_YEAR_MS,
    });

    return res.json({
      success: true,
      user: payload,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Google Login Failed",
    });
  }
});}
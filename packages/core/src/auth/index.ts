import express from "express";
import { UserRepository } from "@./repository";
import passport from "passport";
import { SERVER_CONFIG } from "@./serve-config";
import { isLoggedIn, isNotLoggedIn } from "../middleware";


type GetAuthRouterArgs = {
  userRepository: UserRepository
};

export const getAuthRouter = ({
  userRepository
}: GetAuthRouterArgs) => {

  const authRouter = express.Router();

  authRouter.get("/kakao", isNotLoggedIn, passport.authenticate("kakao"));

  authRouter.get(
    "/callback/kakao",
    isNotLoggedIn, passport.authenticate("kakao", {
      failureRedirect: "/"
    }),
    (req, res) => {
      res.redirect(SERVER_CONFIG.CLIENT_URL);
    }
  );

  authRouter.get("/user", async (req, res) => {
    res.send(req?.user ?? null);
  });

  authRouter.get("/logout", isLoggedIn, async (req, res) => {
    req.logout((err) => {
      if (err) {
        res.redirect(SERVER_CONFIG.CLIENT_URL);
      }
      res.redirect(SERVER_CONFIG.CLIENT_URL);
    });
  });


  return authRouter;
};

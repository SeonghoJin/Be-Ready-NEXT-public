import express from "express";
import * as path from "path";
import { getBlogItemRouter } from "./blogItem";
import {
  BlogItemDatabase,
  CompanyRepository,
  LikeRepository,
  MongoDBConnection,
  TagRepository,
  TimeDatabase,
  UserRepository
} from "@./repository";
import cors from "cors";
import { getCommonRouter } from "./common";
import morgan from "morgan";
import { getAuthRouter } from "./auth";
import passportConfig from "./passport";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import { SERVER_CONFIG } from "@./serve-config";

const COOKIE_SECRET = "____be-ready-NEXT-secret-cookie____";

async function main() {
  const app = express();
  const dbConnection = await new MongoDBConnection(
    SERVER_CONFIG.DATABASE_URL
  ).connect();

  const blogItemRepository = new BlogItemDatabase(dbConnection);
  const timeRepository = new TimeDatabase(dbConnection);
  const companyRepository = new CompanyRepository(dbConnection);
  const tagRepository = new TagRepository(dbConnection);
  const userRepository = new UserRepository(dbConnection);
  const likeRepository = new LikeRepository(dbConnection);

  passportConfig({ userRepository });

  app.use(morgan("tiny"));
  app.use(cookieParser(COOKIE_SECRET));
  app.use(cors({
    origin: [
      "http://localhost:4300",
      "https://be-ready-next.vercel.app",
      "https://be-ready-next-git-dev-seonghojin.vercel.app",
    ],
    credentials: true
  }));
  app.use(expressSession({
    secret: COOKIE_SECRET,
    resave: false,
    cookie: {
      httpOnly: true,
      domain: SERVER_CONFIG.DOMAIN,
    },
    name: "be-ready-NEXT.sid"
  }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/assets", express.static(path.join(__dirname, "assets")));
  const authRouter = getAuthRouter({
    userRepository
  });

  const blogItemRouter = getBlogItemRouter({
    blogItemRepository,
    likeRepository
  });

  const commonRouter = getCommonRouter({
    timeRepository,
    companyRepository,
    tagRepository
  });


  app.get("/api/ping", (req, res) => {
    res.send({ message: "Welcome to core!" });
  });

  app.use(blogItemRouter);
  app.use("/api/v1/common", commonRouter);
  app.use("/auth", authRouter);


  const port = process.env.PORT || 8080;

  app.listen(port, async () => {
    console.log(`Listening at http://localhost:${port}/api/ping`);
  });

  app.on("error", console.error);
}

main();

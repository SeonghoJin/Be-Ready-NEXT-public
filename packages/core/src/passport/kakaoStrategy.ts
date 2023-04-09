import { UserRepository } from "@./repository";
import passport from "passport";
import * as Kakaopassport from "passport-kakao";
import { SERVER_CONFIG } from "@./serve-config";

export default ({ userRepository }: { userRepository: UserRepository }) => {
  passport.use(
    new Kakaopassport.Strategy(
      {
        clientID: SERVER_CONFIG.KAKAO_CLIENT_ID,
        callbackURL: SERVER_CONFIG.KAKAO_CALLBACK_URL
      }, async (accessToken, refreshToken, profile, done) => {
        const { provider, id } = profile;

        try {
          const exUser = await userRepository.db.findOne({
            provider,
            id
          });

          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await userRepository.db.insertOne({
              provider,
              id
            });

            console.log("new User >>", newUser);
            done(null, { provider, id });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }

      }
    )
  );
}

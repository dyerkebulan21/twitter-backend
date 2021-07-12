import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel, UserModelInterface } from "../models/userModel";
import { generateMD5 } from "../utils/generateHash";

passport.use(
  //@ts-ignore
  new LocalStrategy(async (username, password, done): Promise<void> => {
    try {
      const user = await UserModel.findOne({
        $or: [{ email: username }, { username }],
      }).exec();
      if (!user) {
        return done(null, false);
      }

      if (
        user.confirmed &&
        user.password === generateMD5(password + process.env.SECRET_KEY)
      ) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error, false);
    }
  })
);
//@ts-ignore
passport.serializeUser((user: UserModelInterface, done) => {
  done(null, user?._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

export { passport };
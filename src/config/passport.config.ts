import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userService } from '../modules/user/user.service';
import { UserAuth } from '../helpers/userAuth.helper';
import { IUser } from '../database/models/interfaces/user.interface';

passport.serializeUser((user, done) => {
  done(null, user);
});

export const passportConfig = () => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user: IUser = await userService.findUserByEmail(email);

          if (!user) {
            return done({
              message: 'This email is not registered, Please sign up',
            });
          }

          if (!UserAuth.unhashPassword(password, user.password)) {
            return done({ message: 'Incorrect email or password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

import { User } from '@./common';
import { UserRepository } from '@./repository';
import passport from 'passport';
import kakaoStrategy from './kakaoStrategy';

export default ({ userRepository }: { userRepository: UserRepository }) => {

    passport.serializeUser((user: User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userRepository.db.findOne({ id })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    kakaoStrategy({ userRepository });
}
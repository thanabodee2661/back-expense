var passport = require('passport');
var passportJwt = require('passport-jwt');
var authService = require('./auth');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "namtanGG"
}, async (jwtPayload, done) => {
    
    const results = await authService.checkUserInDb(jwtPayload.users_id);
    if (results.result) {
        done(null, true);
    } else {
        done(null, false, results);
    }
}));

exports.authentication = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, result, info) => {
        if (err) next(err);
        if (!result) {
            res.status(401).json({message: info.message, status: info.status})
        } else {
            next();
        }
    })(req, res, next);
};

var passport = require('passport');
var passportJwt = require('passport-jwt');
var authService = require('./auth');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "namtanGG"
}, async (jwtPayload, done) => {
    try {
        const results = await authService.checkUserInDb(jwtPayload.userId);
        if (results.result) {
            done(null, true);
        } else {
            done(null, false, results);
        }
    } catch (err) {
        done(err.message, false);
    }
}));

exports.authentication = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, result, info) => {
        if (err){
            res.status(500).json({message: err, status: 500})
        } else if (!result) {
            res.status(401).json({message: info.message, status: info.status})
        } else {
            next();
        }
    })(req, res, next);
};

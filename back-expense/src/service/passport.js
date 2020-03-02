var passport = require('passport');
var passportJwt = require('passport-jwt');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "namtanGG"
}, (jwtPayload, done) => {
    if (jwtPayload.username === 'thanabodee') {
        done(null, true);
    } else {
        done(null, false);
    }
}));

module.exports = passport;

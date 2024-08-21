const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("myUser");
const PosUser = require("../Models/PosUser");
const myKey = require("../setup/myurl");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: myKey.secret
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }

        const posUser = await PosUser.findById(jwt_payload.id);
        if (posUser) {
          return done(null, posUser);
        }

        return done(null, false);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};

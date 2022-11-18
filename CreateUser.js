const express = require( 'express' );
const User = require( './UserModel' );
const bycrypt = require( 'bcrypt' );
const createUser = express.Router();

createUser.post( "/", async ( req, res ) => {
    const salt = await bycrypt.genSalt( 10 );
    const hashed = await bycrypt.hash( "1234", salt );
    const newUser = new User( {
        name: "Sammy",
        email: "sammymureithi20@gmail.com",
        password: hashed
    } );
    const result = newUser.save();
    res.send( result );
} );
module.exports = createUser;
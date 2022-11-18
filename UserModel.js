const mongoose = require( 'mongoose' );

const User = new mongoose.model( 'Users', new mongoose.Schema( {
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
} ) );
module.exports = User;
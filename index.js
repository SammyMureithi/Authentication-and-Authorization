const express = require( 'express' );
const mongoose = require( 'mongoose' );
const bycrypt = require( 'bcrypt' );
mongoose.connect( 'mongodb://127.0.0.1/authen')
    .then( () => console.log( "Successfuly Connected" ) )
    .catch( err => console.log( "Error Conecting to db ...", err ) )
const app = express();
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
async function createNewUser(name,email,password) {
    const salt = await bycrypt.genSalt( 10 );
    const hashed = await bycrypt.hash( password, salt );
    const newUser = new User( {
        name: name,
        email: email,
        password: hashed
    } );
    const result = newUser.save();
   // console.log(result);
}
async function login(email,password) {
    let user = await User.findOne( { email: email } );
    if ( !user ) return console.log( 'Invalid Username or Password' );
    const isValid = await bycrypt.compare( password, user.password );
    if ( !isValid ) return console.log( 'Invalid Username or Passoword' );
    
    console.log( { error: false, message: "Successfully Logged In" } )
}
//createNewUser( 'Kirathe Mureithi', 'kirathemureithi20@gmail.com', "1234" );
login( 'kirathemurithi20@gmail.com', '1234' );
app.listen(3000)
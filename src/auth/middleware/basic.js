'use srtict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const User = require('../models/user-model');


const signin = async (req, res, next) => {

    // req.headers.authorization => Basic pw=res4
    const headers = req.headers.authorization.split(' '); // ['Basic','pw=res4] pw->the username and password encode
    if (!headers[0] === 'Basic') next('Wrong Authorization headers');
    const decodedPass = base64.decode(headers[1]); //'mahmoud:1234'
    const [username, password] = decodedPass.split(':');
    try {
        const user = await User.findOne({ username });//search in DB for this user use the username
        if (!user || !password) next('Wrong User / password');

        const valid = await bcrypt.compare(password, user.password);//after found the username in db compare the password in db with the password when the user login
        if (valid) {
            req.user = user;
            res.json(user);
        }

    } catch (error) {
        console.log('WHAT', error);
        res.status(403).json({ message: error.message });
    }

    // /*
    //   req.headers.authorization is : "Basic sdkjdsljd="
    //   To get username and password from this, take the following steps:
    //     - Turn that string into an array by splitting on ' '
    //     - Pop off the last value
    //     - Decode that encoded string so it returns to user:pass
    //     - Split on ':' to turn it into an array
    //     - Pull username and password from that array
    // */

    // let headers = req.headers.authorization.split(' '),  // ['Basic', 'sdkjdsljd=']
    //     let encodedString = basicHeaderParts.pop(),  // sdkjdsljd=
    //     let decodedString = base64.decode(encodedString), // "username:password"
    //     let [username, password] = decodedString.split(':'), // username, password

    // /*
    //  Now that we finally have username and password, let's see if it's valid
    //  1. Find the user in the database by username
    //  2. Compare the plaintext password we now have against the encrypted password in the db
    //     - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    //  3. Either we're valid or we throw an error
    // */
    // try {
    //     const user = await Users.findOne({ username: username })
    //     const valid = await bcrypt.compare(password, user.password);
    //     if (valid) {
    //         res.status(200).json(user);
    //     }
    //     else {
    //         throw new Error('Invalid User')
    //     }
    // } catch (error) { res.status(403).send("Invalid Login"); }
}



module.exports = signin;
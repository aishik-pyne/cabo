import { sign, SignOptions, verify, VerifyErrors, decode } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';


const SECRET = "VT7nxlSx3fkJ5Avz5fR210oIusNfX1V8";
/**
 * generates JWT used for local testing
 */
export function generateToken(id: string) {
    // information to be encoded in the JWT
    const payload = {
        id: id
    };
    // read private key value
    // const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));
    const secret = "asdasdafsdg";
    const signInOptions: SignOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: 'RS256',
        expiresIn: '1h'
    };

    // generate JWT
    return sign(payload, SECRET);
};

export function verifyToken(token: string) {
    return verify(token, SECRET);
}

export function decodeToken(token: string) {
    return decode(token);
}
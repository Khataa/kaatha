
import bcrypt from 'bcrypt';
const hashRounds : number = 10;
export async function hashPassword(password : string) {
    const salted = await bcrypt.genSalt(hashRounds);
    const hashed = await bcrypt.hash(password, salted);
    return hashed;
}

export async function validatePassword(password : string, hash : string){
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
}
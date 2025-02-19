import axios from "axios";


export async function customerSignUp(cName: string, cEmail: string, cPassword: string) {
    return  await axios.post(`http://localhost:3000/api/auth/user-customer/sign-up`, {customerName: cName, customerPassword: cPassword, customerEmail: cEmail});
}

export async function merchantSignUp(mName: string, mEmail: string, mPassword: string, mShopName: string) {
    return await axios.post(`http://localhost:3000/api/auth/shop-merchant/sign-up`, {shopMerchantName: mName, shopMerchantPassword: mPassword, shopMerchantEmail: mEmail, shopName: mShopName});
}

export async function customerSignIn(cEmail: string, cPassword: string) {
    return await axios.post(`http://localhost:3000/api/auth/user-customer/sign-in`, {customerEmail: cEmail, customerPassword: cPassword})
}

export async function merchantSignIn(mEmail: string, mPassword: string){
    return await axios.post(`http://localhost:3000/api/auth/shop-merchant/sign-in`, {shopMerchantEmail: mEmail, shopMerchantPassword: mPassword});
}
export async function isLoggedIn(){
    return await axios.get(`http://localhost:3000/api/util/isLoggedIn`);
}

export async function getTypeOfuser(){
    return await axios.get('http://localhost:3000/api/util/getTypeOfUser');
}
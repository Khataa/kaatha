// app/register/page.tsx
'use client'
import { customerSignUp, isLoggedIn, merchantSignUp } from "@/apiLibs/authapis";
import Header from "@/app/comps/header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [mName, setMName] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mPassword, setMPassword] = useState("");
  const [mShopName, setMShopName] = useState("");
  const {isAuthenticated} = useAuth();
  if(isAuthenticated){
    router.push('/dashboard');
  }
  async function handleMerchantSignUp(e:any) {
    e.preventDefault();
    try{
      await merchantSignUp(mName, mEmail, mPassword, mShopName);
      router.push('/sign-in');
    }catch(e){
      console.log(e);
    }
  }
  async function handleCustomerSignUp(e:any) {
    e.preventDefault();
    console.log(cName, cEmail, cPassword);
    try{
      await customerSignUp(cName, cEmail, cPassword);
      router.push('/sign-in');
    }catch(e){
      console.log(e);
    }
  }
  
  return (
    <div>
      <Header />
      <div className="mt-10 min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xl shadow-md">
          <div className="mb-6">
            <h2 className="text-center text-3xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign up as a Customer or a Merchant
            </p>
          </div>
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid grid-cols-2 gap-1 mb-6">
              <TabsTrigger
                value="customer"
                className="py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Customer
              </TabsTrigger>
              <TabsTrigger
                value="merchant"
                className="py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Merchant
              </TabsTrigger>
            </TabsList>
            <TabsContent value="customer" className="mt-2">
              <form className="space-y-5" >
              <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer Name
                  </label>
                  <input
                    id="customer-name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    onChange={(e) => setCName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="siddartha pogula"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customer-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer Email address
                  </label>
                  <input
                    id="customer-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setCEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="siddu@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customer-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Customer Password
                  </label>
                  <input
                    id="customer-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setCPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <button
                  onClick={handleCustomerSignUp}
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign Up as Customer
                  </button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="merchant" className="mt-2">
              <form className="space-y-5"  >
              <div>
                  <label
                    htmlFor="merchant-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merchant Name
                  </label>
                  <input
                    id="merchant-name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    onChange={(e) => setMName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="siddartha pogula"
                  />
                </div>
                <div>
                  <label
                    htmlFor="merchant-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merchant Email address
                  </label>
                  <input
                    id="merchant-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setMEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="merchant-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merchant Password
                  </label>
                  <input
                    id="merchant-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setMPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="merchant-shopname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Merchant Shop Name
                  </label>
                  <input
                    id="merchant-shopname"
                    name="shopname"
                    type="text"
                    required
                    onChange={(e) => setMShopName(e.target.value)}  
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Your shop name"
                  />
                </div>
                <div>
                  <button onClick={handleMerchantSignUp}
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign Up as Merchant
                  </button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

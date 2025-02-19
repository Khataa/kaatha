// app/register/page.tsx
"use client";
import { customerSignIn, merchantSignIn } from "@/apiLibs/authapis";
import Header from "@/app/comps/header";
import { Loading } from "@/app/comps/loading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [cEmail, setCEmail] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mPassword, setMPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const { isAuthenticated, login} = useAuth();
  if (isAuthenticated) {
    router.push("/dashboard");
  }
  const handleCustomerSignIn = async (e:any) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try{
      const {data} = await customerSignIn(cEmail, cPassword);
      if(data.status){
        await login(data.token, 'customer');
      }
    }catch(e){
      console.log(e);
    }
    setIsLoggingIn(false);
  }
  const handleMerchantSignIn = async () => {
    setIsLoggingIn(true);
    try{
      const {data} = await merchantSignIn(mEmail, mPassword);
      if(data.status){
        await login(data.token, 'shop');
        router.push('/dashboard');
      }
    }catch(e){
      console.log(e);
    }
    setIsLoggingIn(false);
  }
  if(isLoggingIn){
    return <Loading/>
  }
  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xl shadow-md">
          <div className="mb-6">
            <h2 className="text-center text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-base text-gray-500">
              Sign in to your account as a Customer or Merchant
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
              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label
                    htmlFor="customer-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="customer-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={cEmail}
                    onChange={(e) => setCEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="customer-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="customer-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleCustomerSignIn}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign In as Customer
                  </button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="merchant" className="mt-2">
              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label
                    htmlFor="merchant-email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="merchant-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={mEmail}
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
                    Password
                  </label>
                  <input
                    id="merchant-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={mPassword}
                    onChange={(e) => setMPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleMerchantSignIn}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Sign In as Merchant
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

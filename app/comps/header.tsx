'use client'
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link"
import { usePathname } from "next/navigation";

const Header = ()=>{
  const {isAuthenticated, logout} = useAuth();
  const path = usePathname();
    return (
        <header className="bg-gray-100 shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 onClick={()=>{window.location.href="/"}} className=" cursor-pointer text-xl font-bold text-gray-800">Khaata</h1>
            <nav className="hidden md:flex space-x-4">
              <Link href="/features" className="text-gray-600 hover:text-gray-800 transition">Features</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800 transition">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition">Contact</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            { path==='/'&& <Link href="/sign-in" className="text-gray-600 hover:text-gray-800 transition">Sign In</Link>}
            { path==='/' &&<Link href="/sign-up" className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">Sign Up</Link>}
            {  <Button onClick={logout}>Logout</Button>}
          </div>
        </div>
      </header>
    )
}

export default Header;
'use client'
import { useAuth } from "@/context/AuthContext";
import Header from "../comps/header";
import { useRouter } from "next/navigation";
export default function DashBoard(){
    const router = useRouter();
    const {isAuthenticated, token, userType} = useAuth();
    if(!isAuthenticated){
        router.push('/sign-in');}
    return (
        <div>
            <Header/>
            <h1>Dashboard</h1>
        </div>
    )
}
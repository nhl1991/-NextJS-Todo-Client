'use client'

import { useAuth } from "@/hooks/useAuth"
import { SERVER_URL } from "@/lib/server";
import { useRouter } from "next/navigation";

export default function Logout(){
    const { setUser } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        const response = await fetch(`${SERVER_URL}/auth/logout`,{
            method: 'POST',
            credentials: 'include'
        })

        if(response.ok){
            setUser(null);
            router.push('/')
        }
    }

    return(
        <button className="btn-hover" onClick={handleLogout}>SIGN OUT</button>
    )
}
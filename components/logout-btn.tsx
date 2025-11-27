'use client'

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation";

export default function Logout(){
    const { setUser } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        const response = await fetch('http://localhost:3001/auth/logout',{
            method: 'POST',
            credentials: 'include'
        })

        if(response.ok){
            setUser(null);
            router.push('/')
        }
    }

    return(
        <button onClick={handleLogout}>Log Out</button>
    )
}
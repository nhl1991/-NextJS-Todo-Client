'use client'

import { useAuth } from "@/hooks/useAuth"

export default function Logout(){
    const { setUser } = useAuth();
    const handleLogout = async () => {
        const response = await fetch('http://localhost:3001/auth/logout',{
            method: 'POST',
            credentials: 'include'
        })

        if(response.ok){
            setUser(null);
        }
    }

    return(
        <button onClick={handleLogout}>Log Out</button>
    )
}
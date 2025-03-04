"use client";
import React, { useContext, useEffect } from 'react';
import Header from './components/Header';
import { GetAuthGlobalData } from '@/services/GlobalApi';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';


const Provider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const convex = useConvex();
    const { user, setUser } = useContext(AuthContext);
    useEffect(() => { 
        CheckUseTAuth();
    }, []);

    const CheckUseTAuth = async () => { 
        const token = localStorage.getItem('user_token');

        //get new access token
        const user = token && await GetAuthGlobalData(token);
        console.log(user);
        
        if (!user?.email) {
            router.replace('/sign-in');
            return;
        }

        //get user info database
        try {
            const result = await convex.query(api.users.GetUser, { email: user?.email }); 
            console.log(result);
            setUser(result);
        } catch (error) {
            
        }
    }
  return (
      <div>
          <Header/>
      {children}
    </div>
  )
}

export default Provider

"use client";

import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';
import { GetAuthGlobalData } from '@/services/GlobalApi';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    const CreateUser = useMutation(api.users.CreateUser);
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user_token', tokenResponse.access_token);
            }
            const user = await GetAuthGlobalData(tokenResponse.access_token);
            //save user info to the database
            const result = await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user.picture
            });
            setUser(result);
            router.replace('/ai-assistance');
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <div className="flex flex-col space-y-2 justify-center items-center h-screen">
            <div className="flex items-center gap-3 border p-4 rounded-md cursor-pointer hover:ring-2 hover:ring-blue-400 dark:bg-white bg-gray-300" onClick={() => googleLogin()}>
                <FcGoogle size={20} />
                <p className="text-md dark:text-black font-bold uppercase">Sign in with Google</p>
            </div>
        </div>
    )
}

export default SignIn

"use client";

import { AuthContext } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser]=useState()
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  
  return (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <ConvexProvider client={convex}>
        <AuthContext.Provider value={{user, setUser}}>
          {children}
          </AuthContext.Provider>
          </ConvexProvider>
        </GoogleOAuthProvider>
  );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Provider from "@/app/context/client-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import RecoidContextProvider from "./recoilContextProvider";
import AuthProvider from "./authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Find Volunteers",
  description:
    "Created to bring people together to be able to collaborate on projects deliberated to help the people of Israel in these difficult times",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <Provider session={session}>
          <RecoidContextProvider>
            <AuthProvider>{children}</AuthProvider>
          </RecoidContextProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}

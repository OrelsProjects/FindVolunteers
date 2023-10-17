import React, { useCallback } from "react";
import Button from "./Button";
import Image from "next/image";
import axios from "axios"; // Install it if you haven't already, using npm install axios

export interface LinkedinLoginProps {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export default function LinkedinLogin({
  onSuccess,
  onFailure,
}: LinkedinLoginProps) {
  const handleLogin = useCallback(() => {
    // Redirect to the server-side route that starts the LinkedIn OAuth flow
    window.location.href = "http://localhost:3001/auth/linkedin";
  }, []);

  return (
    <Button
      className="bg-linkedin hover:bg-linkedin text-white rounded-full py-2 px-4"
      onClick={handleLogin}
    >
      <span className="flex items-center">
        Log in with LinkedIn
        <Image
          src="/linkedin_icon.png"
          alt="LinkedIn"
          className="mr-2"
          width={24}
          height={24}
        />
      </span>
    </Button>
  );
}

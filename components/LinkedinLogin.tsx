import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";

export interface LinkedinLoginProps {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export default function LinkedinLogin({
  onSuccess,
  onFailure,
}: LinkedinLoginProps) {
  return (
    <Button
      className="bg-linkedin hover:bg-linkedinHover text-white rounded-full py-2 px-4"
      onClick={() => signIn()}
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

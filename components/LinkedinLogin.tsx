import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export interface LinkedinLoginProps {
  onSuccess?: () => void;
  onFailure?: () => void;
}

export default function LinkedinLogin({
  onSuccess,
  onFailure,
}: LinkedinLoginProps) {
  const router = useRouter();
  const login = async () => {
    await signIn();
    router.push("profile");
  };

  return (
    <Button
      className="bg-linkedin hover:bg-linkedinHover text-white rounded-full py-2 px-4"
      onClick={login}
    >
      <span className="flex items-center">
        <Image
          src="/linkedin_icon.png"
          alt="LinkedIn"
          className="ml-2"
          width={24}
          height={24}
        />
        התחבר עם לינקדאין
      </span>
    </Button>
  );
}

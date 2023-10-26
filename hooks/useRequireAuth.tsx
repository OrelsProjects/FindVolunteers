import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";

let isLoading = false;

function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userState);

  const updateVolunteerData = (values: any) => {
    setUserData((prevValue: any) => ({
      ...prevValue,
      volunteer: { ...prevValue.volunteer, ...values },
    }));
  };

  useEffect(() => {
    if (status === "authenticated" && !userData && !isLoading) {
      const getUserData = async () => {
        isLoading = true;
        console.log("fetching from db -", session.user?.email);
        const data = await fetch(`/api/user?email=${session.user?.email}`, {
          cache: "no-store",
        });
        const result = await data.json();
        setUserData(result);
        isLoading = false;
      };
      getUserData();
      return;
    }
    // If the session is not loaded yet, do nothing (show loading indicator)
    if (status === "loading") {
      return;
    }

    // If there is no active session, redirect to the login page
    if (!session) {
      router.push("/"); // Redirect to your login page
    }
  }, [status, session, router, userData]);

  return { session, status, userData, updateVolunteerData };
}

export default useRequireAuth;

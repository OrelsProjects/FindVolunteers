import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

let isLoading = false;

function useRequireAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  console.log(userData);

  useEffect(() => {
    if (status === "authenticated" && !userData && !isLoading) {
      // fetch user data from db
      //   await axios.get("/api/user", { params: { }});
      const getUserData = async () => {
        isLoading = true;
        console.log('fetching', session.user?.email);
        const data = await fetch(`/api/user?email=${session.user?.email}`, {
          cache: "no-store",
        });
        const res = await data.json();
        setUserData(res);
        isLoading = false;
        console.log("res", res);
      };
      console.log(' get user data');
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

  return { session, status, userData };
}

export default useRequireAuth;

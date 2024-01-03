import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const authCookieValue = Cookies.get("auth");
    if (authCookieValue && authCookieValue === "true") {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return { isLogged };
};

export default useAuth;
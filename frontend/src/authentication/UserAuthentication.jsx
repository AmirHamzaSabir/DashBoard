import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux/es/hooks/useSelector";

export const isUserLoggedIn = () => {
    const { user } = useSelector((state) => state.auth);

  try {
    if (user && user.token) {
      var decodeToken = jwtDecode(user.token);
      var date = Date.now() / 1000;
      return decodeToken.exp > date;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from '../Shared/Loading';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    if (loading) {
        return <Loading />;
    }
    if (!user) {
        console.log(location);
        signOut(auth);
        return <Navigate to='/login' state={{ from: location }} />;
    }
    return children;
}

export default RequireAuth;
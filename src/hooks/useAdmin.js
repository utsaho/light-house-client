import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../pages/Shared/Loading";

const { useQuery } = require("react-query");
const { default: privateAxios } = require("../api/privateAxios");

const useAdmin = () => {
    const [user, loading] = useAuthState(auth);

    const { data: admin, isLoading } = useQuery(['isAdmin', user], async () => await privateAxios.get(`http://localhost:5000/isAdmin/${user?.email}`,).then(res => res?.data?.status));
    if (loading || isLoading) return <Loading />;
    return admin;
}

export default useAdmin;
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from './useAdmin.js';
const RequireAdmin = ({children}) =>{
    const admin = useAdmin();
    const location = useLocation();
    if(!admin){
        return <Navigate to='/' state={{ from: location }} />;
    }
    else return children;
}

export default RequireAdmin;
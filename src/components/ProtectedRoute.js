import { useLocation, Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAllowed, redirectPath = '/auth/login', children }) {
    const location = useLocation();

    if (!isAllowed) {
        return <Navigate to={redirectPath} state={{from: location}} replace />;
    }
    
    return children ? children : <Outlet />;
}

export default ProtectedRoute
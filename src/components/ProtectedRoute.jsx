import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ element }) {
    const { user } = useContext(UserContext);
    return user ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { getToken } from "../utils/auth";

function ProtectedRoute({ element }) {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Modification à effectuer à partir du context sans passer par le getToken
    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    return isAuthenticated ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

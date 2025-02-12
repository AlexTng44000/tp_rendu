import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

function Dashboard() {
    const { user, logout } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:3000/dashboard", {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                } else {
                    logout();
                    navigate("/login");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur", error);
            }
        };

        if (user) fetchUserData();
    }, [user, logout, navigate]);

    return (
        <div>
            <h2>Tableau de bord</h2>
            {userData ? <p>Bienvenue, {userData.email} !</p> : <p>Chargement...</p>}
            <button onClick={logout}>Se déconnecter</button>
        </div>
    );
}

export default Dashboard;
import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../context/UserContext";

function Navbar() {
    const { user, logout } = useContext(UserContext);

    return (
        <nav>
            <Link to="/">Accueil</Link>
            {!user ? (
                <>
                    <Link to="/register">Inscription</Link>
                    <Link to="/login">Connexion</Link>
                </>
            ) : (
                <>
                    <Link to="/dashboard">Tableau de bord</Link>
                    <button onClick={logout}>Déconnexion</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;

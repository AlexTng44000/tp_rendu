import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
});

function Login() {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsed = loginSchema.safeParse({ email, password });

        if (!parsed.success) {
            setMessage(parsed.error.errors[0].message);
            return;
        }

        try {
            const response = await fetch("https://api.example.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token);
                setMessage("Connexion réussie !");
                navigate("/");
            } else {
                setMessage(data.error || "Identifiants incorrects.");
            }
        } catch (error) {
            setMessage("Erreur de connexion à l'API.");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;

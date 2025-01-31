import { useState } from "react";
import { z } from "zod";

const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const SubmitRegister = async (e) => {
        e.preventDefault();

        const parsed = userSchema.safeParse({ email, password, confirmPassword })

        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        if (parsed.success) {
            alert("Données valides");
        }



        try {
            const response = await fetch("https://api.example.com/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Inscription réussie !");
            } else {
                setMessage(data.error || "Une erreur est survenue.");
            }
        } catch (error) {
            setMessage("Erreur de connexion à l'API.");
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            {message && <p>{message}</p>}
            <form onSubmit={SubmitRegister}>
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
                <input
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;

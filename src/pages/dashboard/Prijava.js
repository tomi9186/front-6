import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

function Prijava() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return;

        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const response = await fetch("https://front6.edukacija.online/backend/wp-json/jwt-auth/v1/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Neispravni podaci za prijavu.");
                console.error("Greška prilikom prijave:", data);
                setLoading(false);
            } else {
                setSuccess("Uspješna prijava!");
                login(data.token, data.user_display_name);
                navigate("/", { replace: true });
            }
        } catch (err) {
            console.error("Greška prilikom prijave:", err);
            setError("Došlo je do greške prilikom povezivanja sa serverom. Pokušajte ponovno.");
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    {/* Lijevi stupac: Pozadinska slika s gradijentom i tekstom */}
                    <div className="col-lg-7 login-page-banner">
                        <div className="login-banner-overlay">
                            <div className="login-banner-text">
                                <h1>Sve što vam treba za modernu uslugu na jednom mjestu.</h1>
                                <p>Upravljajte svojim jelovnikom, narudžbama i ponudom brzo i jednostavno.</p>
                            </div>
                        </div>
                    </div>

                    {/* Desni stupac: Forma za prijavu */}
                    <div className="col-lg-5 login-form-section">
                        <div className="login-form-wrapper">
                            <h2 className="login-title">Prijava</h2>
                            <p className="login-subtitle">Dobrodošli natrag! Prijavite se u svoj MENUTO račun</p>

                            {error && (
                                <div
                                    className="alert alert-danger login-alert-error"
                                    role="alert"
                                    dangerouslySetInnerHTML={{
                                        __html: error,
                                    }}
                                />
                            )}

                            {success && (
                                <div className="alert alert-success login-alert-success" role="alert">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-mail adresa</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control menuto-input"
                                        placeholder="Primjer: ime@adresa.com"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Lozinka</label>
                                    <div className="password-input-wrapper">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            className="form-control menuto-input"
                                            placeholder="Unesite lozinku"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-icon"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            disabled={loading}
                                            aria-label={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                                            title={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                                        >
                                            {showPassword ? (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            ) : (
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="form-check-input menuto-checkbox"
                                            defaultChecked
                                            disabled={loading}
                                        />
                                        <label htmlFor="remember" className="form-check-label">Zapamti me</label>
                                    </div>
                                    <a href="#" className="forgot-password-link">Zaboravili ste lozinku?</a>
                                </div>

                                <button
                                    type="submit"
                                    className={`menuto-cta-btn login-submit-btn w-100 ${loading ? "is-loading" : ""}`}
                                    disabled={loading}
                                    aria-busy={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="login-spinner" aria-hidden="true"></span>
                                            <span>Prijava u tijeku...</span>
                                        </>
                                    ) : (
                                        "Prijavi se"
                                    )}
                                </button>

                                <div className="login-divider">
                                    <span>ili</span>
                                </div>

                                <button type="button" className="google-login-btn w-100" disabled={loading}>
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z" />
                                        <path fill="#FBBC05" d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z" />
                                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z" />
                                    </svg>
                                    Prijavi se putem Googlea
                                </button>

                                <p className="register-prompt">
                                    Nemate račun? <Link to="/registracija">Registrirajte se besplatno</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prijava;
import React, { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './AuthForm.css'; // Import the CSS

//  useAuth hook ke through AuthContext se login function ko access kiya ja raha hai.
// Jab hum const { login } = useAuth(); likhte hain, toh iska matlab hai ki hum AuthContext se login function ko extract kar rahe hain taaki hum usse apne Login.js component mein use kar saken.
// Important Point:
// useAuth() se sirf function ko extract kiya ja raha hai. Is samay login function call nahi ho raha, isliye email aur password ki zaroorat abhi nahi padti.
// Ye line sirf login function ko ready rakhti hai taaki jab user form submit kare, tab hum isse use kar saken.

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Form ke default behavior ko prevent karna
        try {
            await login(email, password);  // login function ko call karna aur email, password pass karna
            navigate('/');
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };//  useAuth() pehle se login function ko ready kar chuka hai, aap is function ko tab call kar sakte hain jab aapke paas email aur password ki values available ho jaayein.
    // Yahan, login(email, password) call karke AuthProvider ke login function ko email aur password pass kiye jaate hain.
    // State Management: Login component mein email aur password states ko manage kiya gaya hai jo user input se update hote hain.
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <div className="input-group">
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                    {/* Forgot Password Link */}
                    <div className="forgot-password-link">
                        <br></br>
                    <Link to="/forgot-password">Forgot Password?</Link> 
                </div>
            </form>
        </div>
    );
}

export default Login;
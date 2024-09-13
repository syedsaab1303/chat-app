// // inside pages folder ResetPasswordPage.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPasswordPage = () => {
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const { token } = useParams();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { newPassword: password });
//             setMessage('Password has been reset');
//         } catch (error) {
//             setMessage('Error resetting password');
//         }
//     };

//     return (
//         <div>
//             <h2 >Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="password"
//                     placeholder="New password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Reset Password</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default ResetPasswordPage;




// inside pages folder ResetPasswordPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ResetPasswordPage.css'; // Import the CSS file

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { newPassword: password });
            setMessage('Password has been reset successfully. Redirecting to login page...');

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setMessage('Error resetting password');
        }
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPasswordPage;

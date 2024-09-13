
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ChatRoom from '../components/ChatRoom';
import { Link } from 'react-router-dom';
import './Home.css';  // Import the CSS file

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to ChatterBox</h1>
            {user ? (
                <ChatRoom />
            ) : (
                <div className="home-links">
                    <p>Please Register/Login to chat.</p>
                    <div>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

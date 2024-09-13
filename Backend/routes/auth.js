/*const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure the correct path

// Registration Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

module.exports = router;
*/

// code with security 
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure the correct path
const { forgotPassword, resetPassword } = require('../controllers/authController');

// Registration Route
router.post(
    '/register',
    [
        // Validate and sanitize inputs
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            await registerUser(req, res);
        } catch (err) {
            //res.status(500).json({ error: 'Server error during registration' });

            console.error('Registration failed:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Server error during registration' });
            }
        }
    }
);

// Login Route
router.post(
    '/login',
    [
        // Validate inputs
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await loginUser(req, res);

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

        } catch (err) {
            // res.status(500).json({ error: 'Server error during login' });
            console.error('Login failed:', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Server error during login' });
            }
        }
    }
);


// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password/:token', resetPassword);


module.exports = router;

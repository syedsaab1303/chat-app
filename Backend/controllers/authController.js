const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to your User model
const crypto = require('crypto');

const AWS = require('aws-sdk');

// AWS configuration
AWS.config.update({ region: 'ap-south-1' }); // Replace with your AWS region
const ses = new AWS.SES({ apiVersion: '2010-12-01' });



// Registration Handler
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received username:', username);
    console.log('Received email:', email);
    console.log('Received password:', password);
    try {
        // Check if the email is already registered
        let existingUser = await User.findOne({ email });   // either give null or Object
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Create a new user instance
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log('Registration successful, token generated');
        // Send response with token and user info
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Handler
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Received email:', email);
    console.log('Received password:', password);
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'User not found. Please register first.' });
        }
        console.log('Stored hashed password:', user.password);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log('Login successful, token generated');
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error' });
        }
       
    }
};


// Forgot Password Controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  
      // Save the reset token to the user in the database (expiration optional)
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
      await user.save();
  
      // SES email parameters
      const params = {
        Source: 'syedtamzeed1303@gmail.com', // Replace with your verified email address in SES
        Destination: {
          ToAddresses: [email], // Recipient's email address
        },
        Message: {
          Subject: {
            Data: 'Password Reset Request',
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
              Charset: 'UTF-8',
            },
            Html: {
              Data: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
              Charset: 'UTF-8',
            },
          },
        },
      };
  
      // Send the email using SES
      await ses.sendEmail(params).promise();
      res.status(200).json({ message: 'Password reset link sent via email.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to send password reset email' });
    }
  };
  
  // Reset Password Controller
  exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Find user by reset token and check expiration
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Update the user's password
      user.password = await bcrypt.hash(newPassword, 12);;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  };
  



import axios from 'axios';
import React, { useState } from 'react'

export default function Signup() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState(''); // Default value is an empty string

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://ec2-65-0-21-186.ap-south-1.compute.amazonaws.com:9000/api/v1/authentication/signup', {
                email,
                full_name: fullName,
                otp,
                password,
                user_type: userType,
            });

            // Assuming your backend returns an OTP
            // Handle the response accordingly
            console.log('OTP sent:', response.data);
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };
    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('YOUR_BACKEND_API_URL/verify-otp', {
                action: 'signup',
                email,
                otp,
            });

            // Handle the response accordingly
            console.log('OTP verification successful:', response.data);
        } catch (error) {
            console.error('Error during OTP verification:', error);
        }
    };

    return (
        <>
            <div>
                <h2>Sign Up</h2>
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Full Name:</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <label>OTP:</label>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>User Type:</label>
                <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <option value="">Select User Type</option>
                    <option value="mentor">Mentor</option>
                    <option value="student">Student</option>
                    <option value="university">university</option>
                    {/* Add more options as needed */}
                </select>

                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </>
    )
}
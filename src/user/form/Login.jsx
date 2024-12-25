import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import "../../../styles/Registration.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const schema = yup.object().shape({
        email: yup.string().email("Invalid email format!").required("Email is required!"),
        password: yup
            .string()
            .min(5, "Password must be at least 5 characters long!")
            .required("Password is required!"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.get("http://localhost:5175/users", {
                params: { email: data.email },
            });

            const user = response.data[0];

            if (user && user.password === data.password) {
                alert("Login successful!");
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("email", user.email);
                localStorage.setItem("username", user.username);
                localStorage.setItem("role", user.role);

                if (user.role === "user") {
                    return (window.location.href = "./home");
                } else {
                    window.location.href = "./adminDashboard";
                }
                
                {/*navigate(user.role === "admin" ? "/adminDashboard" : "/home");*/}
                    

            } else {
                setErrorMessage("Invalid credentials");
            }
        } catch (error) {
            console.error("Error: ", error);
            setErrorMessage("Login failed. Please try again.");
        }
    };

    return (
        <>
            <h1>Welcome to Binge Buddy Application</h1>
            <div className="form-container">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input 
                            id="email" 
                            type="text" 
                            placeholder="Enter your email" 
                            {...register("email")}
                        />
                        <p className="error-message">{errors.email?.message}</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input 
                            id="password" 
                            type="password" 
                            placeholder="Enter your password" 
                            {...register("password")} 
                        />
                        <p className="error-message">{errors.password?.message}</p>
                    </div>
                    <button type="submit" id="submit-button">
                        Log In
                    </button>

                    <p>
                        Don't have an account yet? Sign up <a href="/registration">here</a>
                    </p>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

        </>
    );
};

export default Login;

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../../styles/Registration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";

const Registration = () => {
    const navigate = useNavigate();

    const { data: users } = useFetch("http://localhost:5175/users");

    const schema = yup.object({
        username: yup.string().required("Username is required!"),
        email: yup.string().email("Invalid email format!").required("Email is required!"),
        password: yup
            .string()
            .min(5, "Password must be at least 5 characters long!")
            .max(20, "Password can't exceed 20 characters!")
            .required("Password is required!"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords don't match!")
            .required("Please confirm your password!"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const nextId = users && users.length > 0
                ? (Math.max(...users.map((u) => parseInt(u.id))) + 1).toString()
                : "1";

            const { confirmPassword, ...userData } = data;
            const userWithRole = { ...userData, role: "user", id: nextId, watchlist: [], watched: [] };

            const response = await axios.post("http://localhost:5175/users", userWithRole);
            console.log("User registered: ", response.data);

            alert("Registration Successful!");
            navigate("/");
        } catch (error) {
            console.error("Error during registration: ", error);
            alert("Registration Failed! Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        {...register("username")}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password")}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="error-message">{errors.confirmPassword.message}</p>
                    )}
                </div>
                <button type="submit" id="submit-button">
                    Sign Up
                </button>

                <p style={{ textAlign: "center", marginTop: "10px" }}>
                    Already have an account? Login <a href="#" onClick={() => navigate("/")}>here</a>.
                </p>
            </form>
        </div>
    );
};

export default Registration;

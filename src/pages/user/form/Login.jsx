import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Body,
    FormContainer,
    Title,
    Subtitle,
    Form,
    FormGroup,
    Label,
    Input,
    ErrorMessage,
    SubmitButton,
    LinkText,
} from "../../../styles/Registration";

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
                localStorage.setItem("id", user.id);

                navigate(user.role === "admin" ? "/adminDashboard" : "/home");
                window.location.reload();
            } else {
                setErrorMessage("Invalid email or password!");
            }
        } catch (error) {
            console.error("Error: ", error);
            setErrorMessage("Login failed. Please try again.");
        }
    };

    return (
        <Body>
            <Title>Welcome to Binge Buddy Application</Title>
            <FormContainer>
                <Subtitle>Log In</Subtitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </FormGroup>
                    <SubmitButton type="submit">Log In</SubmitButton>
                    <LinkText>
                        Don't have an account yet? Sign up{" "}
                        <a href="#" onClick={() => navigate("/registration")}>
                            here
                        </a>
                    </LinkText>
                </Form>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </FormContainer>
        </Body>
    );
};

export default Login;

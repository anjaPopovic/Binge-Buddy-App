import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import {
    Body,
    FormContainer,
    Subtitle,
    Form,
    FormGroup,
    Label,
    Input,
    ErrorMessage,
    SubmitButton,
    LinkText,
} from "../../../styles/Registration";

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
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
        <Body>
            <FormContainer>
                <Subtitle>Create Your Account</Subtitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label htmlFor="username">Username:</Label>
                        <Input id="username" type="text" placeholder="Enter your username" {...register("username")} />
                        {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" type="email" placeholder="Enter your email" {...register("email")} />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password:</Label>
                        <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm Password:</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
                    </FormGroup>
                    <SubmitButton type="submit">Sign Up</SubmitButton>
                    <LinkText>
                        Already have an account? Login{" "}
                        <a href="#" onClick={() => navigate("/")}>
                            here
                        </a>
                        .
                    </LinkText>
                </Form>
            </FormContainer>
        </Body>
    );
};

export default Registration;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderTitle = styled.h1`
    text-align: center;
    letter-spacing: 5px;
`;

export const SlideoutSidebar = styled.div`
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-215px")}; /*here for transient props */
    width: 255px;
    height: 100%;
    background-color: #2c3e50;
    color: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    transition: left 0.3s ease;
    z-index: 1000;
`;

export const SidebarNav = styled.nav`
    ul {
        list-style: none;
        padding: 0;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const SidebarLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 20px;
    transition: color 0.3s ease;

    &:hover {
        color: #1abc9c;
    }
`;

export const MenuIcon = styled.button`
    position: fixed;
    top: 20px;
    left: 15px;
    background: none;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    z-index: 1100;
    display: ${(props) => (props.hidden ? "none" : "block")};
`;

export const CloseMenu = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
`;

export const SignOutButton = styled.button`
    background: #e74c3c;
    color: white;
    border: 2px solid #ecf0f1;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #c0392b;
        transform: scale(1.05);
    }
`;

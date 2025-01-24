import styled from "styled-components";

export const Body = styled.div`
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  color: #333;
  margin: 10px;
`;

export const FormContainer = styled.div`
  width: 400px;
  margin: 20px auto;
  padding: 35px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: #555;
  margin: 40px;
`;

export const Subtitle = styled.h2`
  text-align: center;
  margin-bottom: 15px;
  color: #555;
  margin-top: 10px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  color: #555;
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #444;
`;

export const Input = styled.input`
  padding: 10px 3px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #64485c;
    box-shadow: 0 0 5px rgba(100, 72, 92, 0.5);
    outline: none;
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 700;
  text-align: left;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #64485c, #db6c84);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #db6c84, #64485c);
    transform: scale(1.05);
  }
`;

export const LinkText = styled.p`
  text-align: center;
  margin-top: 10px;

  a {
    color: #64485c;
    text-decoration: underline;
    transition: color 0.3s ease;

    &:hover {
      color: #db6c84;
      text-decoration: underline;
    }
  }
`;

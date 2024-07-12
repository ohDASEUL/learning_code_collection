import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticateAction } from "../redux/actions/authenticateAction";

const Login = ({setAuthenticate}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = (event) => {
    event.preventDefault();
    console.log("login user function issue");
    dispatch(authenticateAction.login(id, password));
    navigate("/");
  };
  return (
    <Container className="d-flex justify-content-center">
      <Form onSubmit={(event)=>loginUser(event)}>
        <Form.Group className="mb-3 loginpage-input" controlId="formBasicEmail">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="email" onChange={(event) => setId(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3 loginpage-input" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password"onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="로그인 기억하기" />
        </Form.Group>
        <Button variant="danger" type="submit">
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

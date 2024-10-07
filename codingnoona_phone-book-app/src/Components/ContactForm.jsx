import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
const ContactForm = () => {
  let [name, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let dispatch = useDispatch();
  const createContact = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_CONTACT", payload: { name, phoneNumber } });
    setName("");
    setPhoneNumber("");
  };
  return (
    <Form onSubmit={(event) => createContact(event)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>전화번호</Form.Label>
        <Form.Control
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        생성
      </Button>
    </Form>
  );
};

export default ContactForm;
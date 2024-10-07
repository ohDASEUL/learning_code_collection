import React from "react";
import { Col, Row } from "react-bootstrap";

const ContactItem = ({item}) => {
  return (
    <Row>
      <Col lg={2}>
        <img src="./media/contact-book-icon.png" />
      </Col>
      <Col lg={10}>
        <h4>{item.name}</h4>
        <p>{item.phoneNumber}</p>
      </Col>
    </Row>
  );
};

export default ContactItem;

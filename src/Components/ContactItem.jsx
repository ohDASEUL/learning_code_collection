import React from "react";
import { Col, Row } from "react-bootstrap";

const ContactItem = () => {
  return (
    <Row>
      <Col lg={2}>
        <img src="./media/contact-book-icon.png" />
      </Col>
      <Col lg={10}>
        <div>오다슬</div>
        <div>01012345678</div>
      </Col>
    </Row>
  );
};

export default ContactItem;

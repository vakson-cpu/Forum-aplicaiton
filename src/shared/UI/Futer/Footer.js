import React from "react";
import "./Footer.css";
import { Container,Row,Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer className="footer">
      <Container className="darken">
        <Row>
          <Col xs={12} sm={4}>
            <h4>company</h4>
            <ul>
              <li>
                <a href="/#">About us</a>
              </li>
              <li>
                <a href="#/">Our services</a>
              </li>
              <li>
                <a href="#/">Privacy policy</a>
              </li>
              <li>
                <a href="#/">About The Game</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={4}>
            <h4>Get help</h4>
            <ul>
              <li>
                <a href="/#">FAQ</a>
              </li>
              <li>
                <a href="#/">Demand Password Change</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} sm={4}>
            <h4>Follow us</h4>
            <div className="social-links">
              <a href="/#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

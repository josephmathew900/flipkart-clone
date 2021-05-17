import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch } from 'react-redux';

const Signin = () => {
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email: 'mathewjoseph@gmail.com', password: '12345678' };
    dispatch(login(user));
  };

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value=""
                type="email"
                onChange={() => {}}
              />

              <Input
                label="Password"
                placeholder="Password"
                value=""
                type="password"
                onChange={() => {}}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;

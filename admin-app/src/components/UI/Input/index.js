import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
  const { label, errorMessage, ...rest } = props;
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest} />
      <Form.Text className="text-muted">{errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default Input;

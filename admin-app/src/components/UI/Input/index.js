import React from 'react';
import { Form } from 'react-bootstrap';

const Input = (props) => {
  const { label, errorMessage, ...rest } = props;
  let input = 'null';
  switch (props.type) {
    case 'select':
      input = (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <select
            value={props.value}
            onChange={props.onChange}
            className={props.className}
          >
            <option value="">{props.placeholder}</option>
            {props.options.length > 0
              ? props.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </Form.Group>
      );
      break;
    case 'text':
      break;
    default:
      input = (
        <Form.Group>
          {label && <Form.Label>{label}</Form.Label>}
          <Form.Control {...rest} />
          <Form.Text className="text-muted">{errorMessage}</Form.Text>
        </Form.Group>
      );
  }

  return input;
};

export default Input;

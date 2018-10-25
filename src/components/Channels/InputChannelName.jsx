import React from 'react';
import { FormControl } from 'react-bootstrap';

export default function InputChannelName({ input, disabled }) {
  return (
    <FormControl
      placeholder="Enter message"
      aria-label="Enter message"
      {...input}
      autoComplete="off"
      disabled={disabled}
    />
  );
}

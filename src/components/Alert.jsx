import React from 'react';
import { Alert } from 'react-bootstrap';

export default function AlertMessage({ message }) {
  return (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{`${message}. Try again please`}</p>
    </Alert>
  );
}

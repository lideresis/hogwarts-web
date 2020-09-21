import styled from 'styled-components';

export const Message = styled.div `
  border:1px solid;
  border-radius:2px;
  margin-bottom:1.5em;
  padding:1em;
  text-align:left;
  background-color:#eceff1;
  border-color:#b0bec5;
  color:#607d8b;

  &[data-message-type="info"] {
    background-color:#e3f2fd;
    border-color:#90caf9;
    color:#2196f3;
  }

  &[data-message-type="success"] {
    background-color:#e8f5e9;
    border-color:#a5d6a7;
    color:#4caf50;
  }

  &[data-message-type="alert"] {
    background-color:#fff8e1;
    border-color:#ffe082;
    color:#ffc107;
  }

  &[data-message-type="warning"] {
    background-color:#ffebee;
    border-color:#ef9a9a;
    color:#f44336;
  }
`;
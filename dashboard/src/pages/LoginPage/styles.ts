import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;

  & form {
    max-width: 250px;
    width: 100%;
  }
`;

export const Brand = styled.div`
  text-align: center;

  & img {
    max-width: 250px;
  }

  & h1 {
    font-size: 1.6rem;
    margin: 0;
  }
`;

export const LoginButton = styled.button`
  font-size: 1.2rem;
  width: 5em;
  padding: .2em 0;
  transition: .3s;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
    border: 1px solid transparent;
    color: #fff;
  }
`;
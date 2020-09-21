import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5em 0 0 0;
`;

export const PaginationNav = styled.nav`
  display: flex;

  & ul {
    display: flex;
    list-style: none;
    margin: 0;
  }
`;

export const PaginationButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.1rem;
  transition: .5s;
  width: 2em;
  height: 2em;
  margin-left: .5em;
  border-radius: 1em;
  padding: 0;
  cursor: pointer;
  color: #999;
  
  &::selection {
    background-color: transparent;
  }

  &:hover {
    color: #fff;
    background-color: var(--primary-color);
  }

  &:active, &:focus {
    outline: none;
    border: none;
  }

  &[data-status="active"] {
    color: #555;
    background-color: #f1f1f1;
    cursor: auto;
  }

  &[data-status="disabled"] {
    color: #ddd;
    cursor: auto;

    &:hover {
      background-color: transparent;
    }
  }
`;
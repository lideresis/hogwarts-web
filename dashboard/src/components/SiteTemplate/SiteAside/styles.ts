import styled from 'styled-components';

export const Aside = styled.aside`
  grid-area: sidebar;
  background-color: #fff;
  border-right: 1px solid #f1f1f1;

  & .menu {
    list-style: none;
    margin: 0;
    padding: 1em 2em;

    & li {
      width: 100%;
      margin-top: 1em; 

      & button {
        width: 100%;
        display: block;

      }
    }
  }
`;
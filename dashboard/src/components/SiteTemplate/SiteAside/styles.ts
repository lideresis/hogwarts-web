import styled from 'styled-components';

export const Aside = styled.aside`
  grid-area: sidebar;
  background-color: #fff;
  border-right: 1px solid #f1f1f1;

  &[data-open='false'] {
    display: none;
  }

  & .menu {
    list-style: none;
    margin: 0;
    padding: 0;

    & li {
      width: 100%;
      margin-top: 1em; 
      border-bottom: 1px solid #f1f1f1;

      & a {
        width: 100%;
        display: block;
        line-height: 2.25rem;
        padding: 0 1em .2em 1em;
        font-size: 1.2rem;
      }

      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;
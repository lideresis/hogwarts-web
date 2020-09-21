import styled from 'styled-components';
import { Link } from 'react-scroll';

export const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: .7em 3em;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
`;

export const Logo = styled.img`
  height: 100%;
`;

export const HeaderButton = styled.button`
  color: #999;
  background-color: transparent;
  border: 1px solid transparent;
  font-size: 2.25em;
  cursor: pointer;
  padding: .2em .5em 0 .5em;
  transition: .3s;
  margin-left: 2em;

  &:hover {
    color: var(--primary-color);
  }

  &:active, :focus {
    outline: none;
    border: 1px solid transparent;
  }

  &.options-button {
    margin-left: auto;
  }
`;
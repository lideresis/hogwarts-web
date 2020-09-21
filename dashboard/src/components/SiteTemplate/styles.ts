import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 300px auto;
  grid-template-rows: 100px auto;
  grid-template-areas: 
    "header header"
    "sidebar main";
`;

export const SiteMain = styled.main`
  grid-area: main;
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
`;
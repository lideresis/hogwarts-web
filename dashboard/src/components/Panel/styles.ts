import styled from 'styled-components';

export const PanelWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid #f1f1f1;

  & .panel-title {
    padding: .5em 1em;
    border-bottom: 1px solid #f1f1f1;

    & h3 {
      font-size: 1.6rem;
      margin: 0;
      font-weight: 200;
      color: #999;
    }
  }

  & .panel-content {
    padding: .5em;
  }
`;
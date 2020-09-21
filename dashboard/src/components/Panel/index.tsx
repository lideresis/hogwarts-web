import React from 'react';
import { PanelWrapper } from './styles';
import { PanelProps } from '../../types/site';

const Panel = (props: PanelProps) => {

  return (
    <PanelWrapper>
      {props.children}
    </PanelWrapper>
  );
};

export default Panel;
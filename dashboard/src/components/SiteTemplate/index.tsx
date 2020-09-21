import React from 'react';
import { LayoutContainer, SiteMain } from './styles';
import SiteHeader from './SiteHeader';
import SiteAside from './SiteAside';

const SiteTemplate = (props: {children: JSX.Element[] | JSX.Element}) => {

  return (
    <LayoutContainer>
      <SiteHeader />
      <SiteAside />
      <SiteMain>
        {props.children}
      </SiteMain>
    </LayoutContainer>
  );
};

export default SiteTemplate;
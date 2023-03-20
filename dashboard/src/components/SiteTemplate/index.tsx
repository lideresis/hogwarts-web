import React, {useState} from 'react';
import { LayoutContainer, SiteMain } from './styles';
import SiteHeader from './SiteHeader';
import SiteAside from './SiteAside';

const SiteTemplate = (props: {children: JSX.Element[] | JSX.Element}) => {
  const [ menuOpen, setMenuOpen ] = useState<boolean>(true);

  return (
    <LayoutContainer data-menu={menuOpen ? 'open' : 'closed'}>
      <SiteHeader menuStatus={menuOpen} closeMenuFunc={setMenuOpen}/>
      <SiteAside open={menuOpen} />
      <SiteMain>
        {props.children}
      </SiteMain>
    </LayoutContainer>
  );
};

export default SiteTemplate;
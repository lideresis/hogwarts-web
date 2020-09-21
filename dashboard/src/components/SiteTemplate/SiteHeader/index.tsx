import React from 'react';
import { Header, Logo, HeaderButton } from './styles';
import { FaBars, FaCog } from 'react-icons/fa'

const SiteHeader: React.FC = () => {

  return (
    <Header>
      <Logo src="/assets/imgs/logo-hogwarts.png" alt="Hogwarts School"/>
      <HeaderButton><FaBars/></HeaderButton>
      <HeaderButton className="options-button"><FaCog/></HeaderButton>
    </Header>
  );
};

export default SiteHeader;
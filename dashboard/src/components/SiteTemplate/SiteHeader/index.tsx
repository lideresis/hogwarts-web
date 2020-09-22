import React from 'react';
import { Header, Logo, HeaderButton } from './styles';
import { FaBars, FaDoorOpen } from 'react-icons/fa'
import { logout } from '../../../services/auth';
import { useHistory } from 'react-router-dom';

const SiteHeader = ({menuStatus, closeMenuFunc} : {menuStatus: boolean, closeMenuFunc:React.Dispatch<React.SetStateAction<boolean>> }) => {
  let redirect = useHistory();

  return (
    <Header>
      <Logo src="/assets/imgs/logo-hogwarts.png" alt="Hogwarts School"/>
      <HeaderButton onClick={() => closeMenuFunc(!menuStatus)}><FaBars/></HeaderButton>
      <HeaderButton onClick={() => {logout(); redirect.push("/login");}} className="options-button"><FaDoorOpen/></HeaderButton>
    </Header>
  );
};

export default SiteHeader;
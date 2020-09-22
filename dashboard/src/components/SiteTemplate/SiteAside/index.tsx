import React from 'react';
import { Link } from 'react-router-dom';
import { Aside } from './styles'

const SiteAside = ({open}: {open:boolean}) => {

  return (
    <Aside data-open={open}>
      <nav>
        <ul className="menu">
          <li>
            <Link to="/wizard" title="Meus Bruxos" >Meus Bruxos</Link>
          </li>
          <li>
            <Link to="/user" title="Usuários" >Usuários</Link>
          </li>
        </ul>
      </nav>
    </Aside>
  );
};

export default SiteAside;
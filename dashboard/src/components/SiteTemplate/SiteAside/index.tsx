import React from 'react';
import { Aside } from './styles'

const SiteAside = () => {

  return (
    <Aside>
      <nav>
        <ul className="menu">
          <li>
            <button>Meus Bruxos</button>
          </li>
          <li>
            <button>Usuários</button>
          </li>
        </ul>
      </nav>
    </Aside>
  );
};

export default SiteAside;
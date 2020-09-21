import React, { useState, useEffect } from 'react';

import api from '../../Api';
import { Container } from './styles';
import { Wizard } from '../../types/wizard';
import Panel from '../../components/Panel';


const WizardPage = () => {
  const [ wizards, setWizards ] = useState<Wizard[]>();

  useEffect(() => {
    api.getWizards().then((response) => {
      setWizards(response.data);
    })
  }, []);
  
  return (
    <Panel>
      {wizards ? (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Bruxo</th>
              <th>Especialidade</th>
              <th>Idade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr> 
          </thead>
          <tbody>
            {wizards.map((item:Wizard, index:number) => (
              <tr>
                <td>{item.name}</td>
                <td>{item.specialty}</td>
                <td>{item.age} anos</td>
                <td>{item.is_active ? 'Ativo' : 'Não ativo'}</td>
                <td>ação</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Não existe nenhum bruxo cadastrado.</p>
      )}
    </Panel>
  );
};

export default WizardPage;



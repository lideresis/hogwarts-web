import React, { useState, useEffect } from 'react';

import api from '../../../Api';
import Panel from '../../../components/Panel';
import { PageState, PanelProps, PageAction, MessageType } from '../../../types/site';
import { Wizard, PostWizard, UpdateWizard } from '../../../types/wizard';

const FormPanel = (props: PageState) => {
  const [ panelProps, setPanelProps ] = useState<PanelProps>({
    title: props.title + ' - Formulário',
  } as PanelProps);
  const [ formData, setFormData ] = useState<PostWizard | UpdateWizard>({} as PostWizard | UpdateWizard);
  
  // Get the wizard data if the form action == update
  useEffect(() => {
    if (props.action === PageAction.UPDATE && props.selectedItemId) {
      api.getWizard(props.selectedItemId).then((response) => {
        const wizard: Wizard = response.data;

        setFormData({
          name: wizard.name,
          age: wizard.age,
          is_active: wizard.is_active,
          speciality: wizard.speciality
        });

        console.log(wizard)
      }).catch((err) => {
        console.log(err);

        // Set a alert message to the panel
        setPanelProps({
          ...panelProps, 
          message: {
            message:  "Algo de errado aconteceu ao buscar no banco de dados o bruxo.",
            type: MessageType.ALERT
          }
        })
      })
    }
  }, [props, panelProps])

  // Set the form data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  // Submit form data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (props.action === PageAction.NEW) {
      api.postWizard(formData).then((response) =>{
        props.setStatePageFunction({
          ...props,
          action: PageAction.SINGLE,
          message: {
            message: "Resgistro inserido com sucesso!",
            type: MessageType.SUCCESS
          }
        })
      }).catch((err) => {
        // Set a alert message to the panel
        setPanelProps({
          ...panelProps, 
          message: {
            message: "Algo de errado aconteceu ao persistir os dados.",
            type: MessageType.ALERT
          }
        })
      })
    } else if (props.action === PageAction.UPDATE) {
      api.putWizard(props.selectedItemId!, formData).then((response) =>{
        props.setStatePageFunction({
          ...props,
          action: PageAction.SINGLE,
          message: {
            message: "Resgistro atualizado com sucesso!",
            type: MessageType.SUCCESS
          }
        })
      }).catch((err) => {
        // Set a alert message to the panel
        setPanelProps({
          ...panelProps, 
          message: {
            message:  "Algo de errado aconteceu ao persistir os dados.",
            type: MessageType.ALERT
          }
        })
      })
    }
  }

  // Close the form and return to the list
  const close = () => {
    props.setStatePageFunction({
      ...props,
      action: PageAction.LIST,
      selectedItemId: undefined
    });
  }

  return (
    <Panel { ... panelProps}>
      <form className="form-style" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome Completo</label>
          <input type="text" name="name" id="name" defaultValue={formData.name} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="age">Idade</label>
          <input type="number" name="age" id="age" defaultValue={formData.age} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="speciality">Especialidade</label>
          <input type="text" name="speciality" id="speciality" defaultValue={formData.speciality} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="is_active"><input type="checkbox" name="is_active" id="is_active" defaultChecked={formData.is_active} onChange={handleChange} /> Ativo</label>
          
        </div>

        <div className="button-group">
          <button type="submit" className="button-primary">Salvar</button> 
          <button type="button" className="button" onClick={close}>Cancelar</button>  
        </div>  

      </form>
    </Panel>
  );
};

export default FormPanel;
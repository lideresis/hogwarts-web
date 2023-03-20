import React, { useState, useEffect } from 'react';

import api from '../../../Api';
import Panel from '../../Panel';
import { PageState, PanelProps, PageAction, MessageType } from '../../../types/site';
import { User, PostUser } from '../../../types/user';

const FormPanel = (props: PageState) => {
  const [ panelProps, setPanelProps ] = useState<PanelProps>({
    title: props.title + ' - Formulário',
  } as PanelProps);
  const [ formData, setFormData ] = useState<PostUser>({} as PostUser);
  
  // Get the user data if the form action == update
  useEffect(() => {
    if (props.action === PageAction.UPDATE && props.selectedItemId) {
      api.getUser(props.selectedItemId).then((response) => {
        const user: User = response.data;

        setFormData({
          ...formData,
          name: user.name,
        });

      }).catch((err) => {
        // Set a alert message to the panel
        setPanelProps({
          ...panelProps, 
          message: {
            message:  "Algo de errado aconteceu ao buscar no banco de dados.",
            type: MessageType.ALERT
          }
        })
      })
    }
  }, [props, formData, panelProps])

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
      api.postUser(formData).then((response) =>{
        props.setStatePageFunction({
          ...props,
          action: PageAction.SINGLE,
          message: {
            message: "Resgistro inserido com sucesso!",
            type: MessageType.SUCCESS
          }
        })
      }).catch((err) => {
        console.log(err.response)
        // Set a alert message to the panel
        setPanelProps({
          ...panelProps, 
          message: {
            message: "Algo de errado aconteceu ao persistir os dados.",
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
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" id="email" defaultValue={formData.email} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} required />
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
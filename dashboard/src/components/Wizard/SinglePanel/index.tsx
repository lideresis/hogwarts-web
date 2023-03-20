import React, { useEffect, useState } from 'react';

import api from '../../../Api';
import { MessageType, PageAction, PageState, PanelProps } from '../../../types/site';
import Panel from '../../Panel';

const SinglePanel = (props: PageState) => {
  const [ isMounted, setIsMounted ] = useState<boolean>(false);
  const [ confirmation, setConfirmation ] = useState<boolean>(false);
  const [ panelProps, setPanelProps ] = useState<PanelProps>({
    title: props.title + ' - Ação',
  } as PanelProps);

  useEffect(() => {
    if (!isMounted) {
      if (props.action === PageAction.DELETE) {
        setPanelProps({
          ...panelProps,
          message: {
            message: "ATENÇÃO! Você está prestes a remover permanentemente este registro.",
            type: MessageType.WARNING
          }
        });
      } else {
        setPanelProps({
          ...panelProps,
          message: props.message
        });
      }
      setIsMounted(true);
    }
  }, [isMounted, panelProps, props]);

  const handleConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.checked);
  }

  // Submit form data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api.deleteWizard(props.selectedItemId!).then((response) => {
      props.setStatePageFunction({
        ...props,
        action: PageAction.SINGLE,
        selectedItemId: undefined,
        message: {
          message: "Resgistro removido com sucesso!",
          type: MessageType.SUCCESS
        }
      });

      setIsMounted(false);
    }).catch((err) => {
      // Set a alert message to the panel
      setPanelProps({
        ...panelProps, 
        message: {
          message: "Algo de errado aconteceu ao remover os dados.",
          type: MessageType.ALERT
        }
      });
    });
  }

  // Back to the list
  const back = () => {
    props.setStatePageFunction({
      ...props,
      action: PageAction.LIST,
      selectedItemId: undefined,
      message: undefined
    });
  }

  return (
    <Panel {... panelProps} >
      <>
        { props.action === PageAction.SINGLE ? (
          <div>
            <button type="button" className="button" onClick={back}>Voltar</button>  
          </div>
        ) : (
          <form className="form-style" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="confirmation">
                <input type="checkbox" name="confirmation" id="confirmation" defaultChecked={confirmation} onChange={handleConfirmation}/> Tem certeza que deseja remover este registro?
              </label>
            </div>
            <div>
              <button type="submit" className="button-red" disabled={!confirmation}>Confirmar remoção</button>  
              <button type="button" className="button" onClick={back}>Cancelar</button> 
            </div>
          </form>
          
        )}
      </>
    </Panel>
  );
}

export default SinglePanel;

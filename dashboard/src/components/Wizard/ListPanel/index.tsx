import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import api from '../../../Api';
import { WizardsPaginated, Wizard } from '../../../types/wizard';
import Panel from '../../../components/Panel';
import { PageAction, PageState, PanelProps } from '../../../types/site';
import { OrderType, PaginationParams } from '../../../types/pagination';
import OrderButton from '../../List/OrderButton';

const ListPanel = (props: PageState) => {
  const [ isMounted, setIsMounted ] = useState<boolean>(false);
  const [ toPage, setToPage ] = useState<number>(1);
  const [ panelProps, setPanelProps ] = useState<PanelProps>({
    title: props.title + ' - Listagem',
    setParentPage: setToPage
  } as PanelProps);
  const [ wizards, setWizards ] = useState<WizardsPaginated>();
  const [ requestWizards, setRequestWizards ] = useState<PaginationParams>({
    limit: 10,
    page: 1,
    orderBy: 'created_at',
    orderType: OrderType.DESC
  } as PaginationParams);

  // Manipulate page changing
  useEffect(() => {
    if (isMounted && toPage !== panelProps.pagination?.currentPage ) {
      setRequestWizards({ ...requestWizards,  page: toPage });
      setIsMounted(false);
    }
  }, [isMounted, toPage, panelProps.pagination, requestWizards])

  // Get the wizards registers and set pagination state
  useEffect(() => {
    if (!isMounted) {
      api.getWizards(requestWizards).then((response) => {
        let data: WizardsPaginated = response.data;
        setWizards(data);

        setPanelProps({
          ...panelProps,
          pagination: data?.meta
        });

        setToPage(data.meta.currentPage);

        setIsMounted(true);
      });
    }
  }, [isMounted, requestWizards, panelProps]);


  // Set page action
  const handleAction = (id: string, action: PageAction) => {
    props.setStatePageFunction({
      ...props,
      action: action,
      selectedItemId: id
    });
  }

  // Handle sorting
  const handleSorting = (field: string) => {
    setRequestWizards({
      ...requestWizards,
      page: 1,
      orderBy: field,
      orderType: requestWizards.orderBy !== field || requestWizards.orderType === OrderType.ASC ? OrderType.DESC : OrderType.ASC 
    });

    setIsMounted(false);
  }

  return isMounted ? (
    <Panel { ...panelProps}>
      {wizards ? (
        <div className="custom-table">
          <table>
            <thead>
              <tr>
                <th>Bruxo<OrderButton onClick={() => handleSorting("name")} order={requestWizards.orderBy === "name" ? requestWizards.orderType : undefined} /></th>
                <th>Especialidade<OrderButton onClick={() => handleSorting("speciality")} order={requestWizards.orderBy === "speciality" ? requestWizards.orderType : undefined} /></th>
                <th>Idade</th>
                <th>Status</th>
                <th>Ações</th>
              </tr> 
            </thead>
            <tbody>
              {wizards.items.map((item:Wizard, index:number) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.speciality}</td>
                  <td>{item.age} anos</td>
                  <td>{item.is_active ? 'Ativo' : 'Não ativo'}</td>
                  <td className="minus">
                    <button className="button-yellow" onClick={() => handleAction(item.id, PageAction.UPDATE)}><FaEdit size="18"/></button>
                    <button className="button-red" onClick={() => handleAction(item.id, PageAction.DELETE)}><FaTrash size="18"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Não existe nenhum bruxo cadastrado.</p>
      )}
    </Panel>
  ) : ( null );
};

export default ListPanel;
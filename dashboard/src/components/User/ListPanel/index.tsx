import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

import api from '../../../Api';
import { UsersPaginated, User } from '../../../types/user';
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
  const [ users, setUsers ] = useState<UsersPaginated>();
  const [ requestUsers, setRequestUsers ] = useState<PaginationParams>({
    limit: 10,
    page: 1,
    orderBy: 'created_at',
    orderType: OrderType.DESC
  } as PaginationParams);

  // Manipulate page changing
  useEffect(() => {
    if (isMounted && toPage !== panelProps.pagination?.currentPage ) {
      setRequestUsers({ ...requestUsers,  page: toPage });
      setIsMounted(false);
    }
  }, [isMounted, toPage, panelProps.pagination, requestUsers])

  // Get the wizards registers and set pagination state
  useEffect(() => {
    if (!isMounted) {
      api.getUsers(requestUsers).then((response) => {
        let data: UsersPaginated = response.data;
        setUsers(data);

        setPanelProps({
          ...panelProps,
          pagination: data?.meta
        });

        setToPage(data.meta.currentPage);

        setIsMounted(true);
      });
    }
  }, [isMounted, requestUsers, panelProps]);


  // Set page action
  const handleAction = (action: PageAction, id?: string ) => {
    props.setStatePageFunction({
      ...props,
      action: action,
      selectedItemId: id
    });
  }

  // Handle sorting
  const handleSorting = (field: string) => {
    setRequestUsers({
      ...requestUsers,
      page: 1,
      orderBy: field,
      orderType: requestUsers.orderBy !== field || requestUsers.orderType === OrderType.ASC ? OrderType.DESC : OrderType.ASC 
    });

    setIsMounted(false);
  }

  return isMounted ? (
    <Panel { ...panelProps}>
      <>
        <div className="button-group">
          <button className="button-primary" onClick={() => handleAction(PageAction.NEW)}>Inserir</button>
        </div>
        
        {users ? (
          <div className="custom-table">
            <table>
              <thead>
                <tr>
                  <th>Nome<OrderButton onClick={() => handleSorting("name")} order={requestUsers.orderBy === "name" ? requestUsers.orderType : undefined} /></th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr> 
              </thead>
              <tbody>
                {users.items.map((item:User, index:number) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className="minus">
                      <button className="button-red" onClick={() => handleAction(PageAction.DELETE, item.id)}><FaTrash size="18"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Não existe nenhum bruxo cadastrado.</p>
        )}
      </>
    </Panel>
  ) : ( null );
};

export default ListPanel;
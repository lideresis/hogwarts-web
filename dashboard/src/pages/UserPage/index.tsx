import React, { useState, useEffect } from 'react';

import ListPanel from '../../components/User/ListPanel';
import FormPanel from '../../components/User/FormPanel';
import SinglePanel from '../../components/User/SinglePanel';
import { PageState, PageAction } from '../../types/site';

const UserPage = () => {
  const [ pageState, setPageState ] = useState<PageState>({
    title: "Usuários",
    action: PageAction.LIST,
  } as PageState);
  const [ isMounted, setIsMounted ] = useState<boolean>(false);

  useEffect(() => {
    if (!isMounted) {
      setPageState({
        ...pageState,
        setStatePageFunction: setPageState
      });

      setIsMounted(true);
    }
  }, [isMounted, pageState]);

  if (pageState.action === PageAction.NEW || pageState.action === PageAction.UPDATE) {
    return <FormPanel {... pageState} />;
  } else if (pageState.action === PageAction.SINGLE || pageState.action === PageAction.DELETE) {
    return <SinglePanel {... pageState} />;
  } else {
    return <ListPanel {... pageState} />;
  }
};

export default UserPage;



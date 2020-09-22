import React, { useState, useEffect } from 'react';

import ListPanel from '../../components/Wizard/ListPanel';
import FormPanel from '../../components/Wizard/FormPanel';
import SinglePanel from '../../components/Wizard/SinglePanel';
import { PageState, PageAction } from '../../types/site';

const WizardPage = () => {
  const [ pageState, setPageState ] = useState<PageState>({
    title: "Meus bruxos",
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

export default WizardPage;



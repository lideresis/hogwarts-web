import React, { useEffect, useState } from 'react';
import { PanelWrapper } from './styles';
import { PanelProps } from '../../types/site';
import MessageBox from '../MessageBox';
import Pagination from '../Pagination';

const Panel = (props: PanelProps) => {
  const [ page, setPage ] = useState<number>(1);

  useEffect(() => {
    if (props.pagination) {
      setPage(props.pagination!.currentPage);
    }
  }, [props.pagination])

  useEffect(() => {
    if (props.setParentPage && props.pagination && ( page !== props.pagination!.currentPage)) {
      props.setParentPage(page);
    }
  }, [props.setParentPage, page]);

  return (
    <PanelWrapper>
      <div className="panel-title">
        <h3>{props.title}</h3>
      </div>
      <div className="panel-content">
        {props.message ? (
          <MessageBox {... props.message} />
        ) : (
          null
        )}
        {props.children}
        {props.pagination ? (
          <Pagination {... { meta: props.pagination, page: page, setPage: setPage } } />
        ) : ( null )}
      </div>
    </PanelWrapper>
  );
};

export default Panel;
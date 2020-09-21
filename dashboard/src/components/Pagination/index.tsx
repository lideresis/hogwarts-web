import React, { useState, useEffect } from 'react';

import { PaginationNav, PaginationWrapper, PaginationButton } from './styles';
import { PaginatedMeta, PaginationButtonType, PaginationButtons, PaginationPages } from '../../types/pagination';

const Pagination = ({meta, page, setPage} : {meta: PaginatedMeta, page: number, setPage: Function}) => {
  const [ buttons, setButtons ] = useState<PaginationButtons>({} as PaginationButtons);
  const [ pages, setPages ] = useState<PaginationPages>({} as PaginationPages);
  const [ isMounted, setIsMounted ] = useState<boolean>(false);

  // Set page number variables
  useEffect(() => {
    setPages({
      first: +page === 1 ? 1 : ( +page > 2 && +page >= meta.totalPages ? +page - 2 : +page - 1 ),
      second: +page > 1 && ( +page < meta.totalPages || +page === 2 ) ? +page : (+page === meta.totalPages ? +page - 1 : +page + 1),
      third: +page === meta.totalPages ? +page : ( +page === 1 ? 3 : +page + 1 )
    });
  }, [page, meta]);

  // Set the pagination buttons variables
  useEffect(() => {
    if (Object.keys(pages).length > 0) {
      setButtons({
        start: {
          text: '<',
          page: 1,
          status: page > 1 ? 'default' : 'disabled'
        },
        first: {
          text: (pages.first).toString(),
          page: pages.first,
          status: pages.first === +page ? 'active' : 'default'
        },
        second: {
          text: (pages.second).toString(),
          page: pages.second,
          status: pages.second === +page ? 'active' : 'default'
        },
        third: {
          text: (pages.third).toString(),
          page: pages.third,
          status: pages.third === +page ? 'active' : 'default'
        },
        end: {
          text: '>',
          page: meta.totalPages,
          status: page < meta.totalPages ? 'default' : 'disabled'
        }
      });

      setIsMounted(true);
    }
  }, [pages, meta, page]);

  const setParentPage = (toPage: number) => {
    if (toPage !== page) {   
      setPage(toPage)
    }
  }

  return (
    <>
      { isMounted ? (
        <PaginationWrapper>
          <div><p>Mostrando {meta.itemCount} de {meta.totalItems}</p></div>
          { buttons && meta.totalPages > 1 ? (
            <PaginationNav>
              <ul>
                {Object.values(buttons).map((item:PaginationButtonType, index:number) =>
                  index !== Object.keys(buttons).length - 1 || (index === Object.keys(buttons).length - 1 && meta.totalPages > 2) ? 
                    <li key={index}><PaginationButton data-status={item.status} onClick={() => setParentPage(item.page)}>{item.text}</PaginationButton></li>
                  : ( null )
                )}
              </ul>
            </PaginationNav>
          ) : ( null ) }
        </PaginationWrapper>
      ) : ( null )}
    </>
  );
}

export default Pagination;
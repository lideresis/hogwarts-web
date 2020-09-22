import React from 'react';
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from 'react-icons/ti';
import { OrderType } from '../../../types/pagination';

import { OrderButtonStyled } from './styles';

const OrderButton = ({order, onClick}: {order: OrderType | undefined, onClick: () => void}) => {
  return (
    <OrderButtonStyled className="button" onClick={onClick}>
      { order === OrderType.ASC ? <TiArrowSortedUp />
      : order === OrderType.DESC ? <TiArrowSortedDown />
      : <TiArrowUnsorted /> }
    </OrderButtonStyled>
  );
}

export default OrderButton;
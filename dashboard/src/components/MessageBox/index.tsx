import React from 'react';
import { Message } from './styles';
import { MessageProps } from '../../types/site';

const MessageBox = (props: MessageProps) => {
  return (
    <>
      { props.message ? (   
        <Message data-message-type={props.type}>
          <p>{props.message}</p>
        </Message>
      ) : (
        null
      )}
    </>
  );
};

export default MessageBox;
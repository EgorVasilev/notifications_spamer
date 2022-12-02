import React, {FC} from 'react';
import {AlertTitle} from '@mui/material';

import {Notification as NotificationType} from '../../reducers/notifications/notifications';

type PropsType = {
  notification: NotificationType;
};

export const Notification: FC<PropsType> = ({notification}) => {
  const {title, text} = notification;
  return (
    <>
      <AlertTitle style={{textAlign: 'start'}}>{title}</AlertTitle>
      {text}
    </>
  );
};

import React, {useEffect, useState} from 'react';
import {Alert, Snackbar, SnackbarCloseReason} from '@mui/material';

import {useNotifications} from '../../contexts/notifications/notifications';
import {notificationsService} from '../../services/notifications';
import {
  ADD_NOTIFICATION,
  READ_NOTIFICATION,
} from '../../reducers/notifications/notifications';
import {Notification} from '../notification/notification';

export const NotificationGenerator = () => {
  const [isNotificationVisible, setNotificationVisibility] = useState(false);
  const {notifications, dispatch} = useNotifications();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationVisibility(false);
  };

  useEffect(() => {
    const subscription = notificationsService.subscribe(notification => {
      dispatch({type: ADD_NOTIFICATION, payload: notification});
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length === 0) {
      return;
    }

    setNotificationVisibility(true);
  }, [notifications, dispatch]);

  const currentNotification = notifications[0];

  return currentNotification ? (
    <Snackbar
      open={isNotificationVisible}
      autoHideDuration={5000}
      TransitionProps={{
        onExited: () => {
          dispatch({type: READ_NOTIFICATION});
        },
      }}
      onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
      <Alert severity={currentNotification.type} sx={{maxWidth: 300}}>
        <Notification notification={currentNotification} />
      </Alert>
    </Snackbar>
  ) : null;
};

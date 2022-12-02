import React, {useCallback, useState} from 'react';
import Typography from '@mui/material/Typography';
import {Alert, Stack} from '@mui/material';

import {Notification} from '../../components/notification/notification';
import {notificationsService} from '../../services/notifications';
import {AddNotificationForm} from '../../components/addNotificationForm/addNotificationForm';

export const DashboardPage = () => {
  const [notificationsList, updateList] = useState(
    notificationsService.notifications,
  );

  const removeNotification = (index: number) => {
    notificationsService.remove(index);

    updateList([...notificationsService.notifications]);
  };

  const onAddNewElement = useCallback(() => {
    updateList([...notificationsService.notifications]);
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" color="white" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" component="h2" color="white" gutterBottom>
        Current rotation:
      </Typography>
      <Stack display="inline-flex" padding={1} spacing={2}>
        {notificationsList.map((notification, index) => (
          <Alert
            key={notification.date}
            severity={notification.type}
            onClose={() => removeNotification(index)}>
            <Notification notification={notification} />
          </Alert>
        ))}
      </Stack>
      <Typography variant="body1" color="white">
        Use the form below to create a new notification:
      </Typography>
      <AddNotificationForm onSubmit={onAddNewElement} />
    </>
  );
};

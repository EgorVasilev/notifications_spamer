import React, {useCallback, useState} from 'react';
import Typography from '@mui/material/Typography';
import {Alert, Box, Container, Grid, Stack} from '@mui/material';

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
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" color="white" gutterBottom>
        Dashboard
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6} sx={{alignItems: 'end'}}>
          <Typography variant="h5" component="h2" color="white" gutterBottom>
            Current rotation:
          </Typography>
          <Stack
            sx={{alignItems: 'center'}}
            display="inline-flex"
            padding={1}
            spacing={2}>
            {notificationsList.map((notification, index) => (
              <Alert
                key={notification.date}
                severity={notification.type}
                sx={{width: 'fit-content'}}
                onClose={() => removeNotification(index)}>
                <Notification notification={notification} />
              </Alert>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'sticky',
              top: 10,
              display: 'grid',
              justifyItems: 'center',
              pb: 2,
            }}>
            <Typography variant="h5" component="h2" color="white" gutterBottom>
              Use the form below to create a new notification:
            </Typography>

            <AddNotificationForm onSubmit={onAddNewElement} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

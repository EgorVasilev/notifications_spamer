import React from 'react';
import {Link, Typography} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

import {DASHBOARD} from '../../constants/routes';
import {NotificationGenerator} from '../../components/notificationGenerator/notificationGenerator';
import {NotificationsProvider} from '../../contexts/notifications/notifications';

export const HomePage = () => {
  return (
    <>
      <Typography variant="h4" component="h1" color="white" gutterBottom>
        Home Page
      </Typography>
      <Typography variant="body1" color="white">
        Notifications will appears at the bottom of your screen :)
      </Typography>
      <Typography variant="body1" color="white">
        Want to add some extra notifications? Visit the{' '}
        <Link component={RouterLink} to={DASHBOARD}>
          Dashboard
        </Link>
      </Typography>

      <NotificationsProvider>
        <NotificationGenerator />
      </NotificationsProvider>
    </>
  );
};

import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {Box} from '@mui/material';

import {DASHBOARD, HOME_PAGE} from '../../constants/routes';

export const NavBar = () => {
  return (
    <nav>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          mt: 3,
          mb: 3,
          fontSize: 20,
        }}>
        <RouterLink
          style={{color: '#fff', textDecoration: 'underline', marginRight: 30}}
          to={HOME_PAGE}>
          Go to Home
        </RouterLink>
        <RouterLink
          style={{color: '#fff', textDecoration: 'underline'}}
          to={DASHBOARD}>
          Go to Dashboard
        </RouterLink>
      </Box>
    </nav>
  );
};

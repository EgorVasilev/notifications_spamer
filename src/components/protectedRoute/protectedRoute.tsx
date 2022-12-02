import React, {FC, ReactElement} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuthToken} from '../../hooks/useAuthToken';
import {LOGIN} from '../../constants/routes';

export const ProtectedRoute: FC<{children: ReactElement}> = ({children}) => {
  const {token} = useAuthToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to={`/${LOGIN}`} replace state={{from: location}} />;
  }

  return children;
};

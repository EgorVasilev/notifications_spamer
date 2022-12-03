import React, {FC, ReactNode} from 'react';
import {
  notificationsReducer,
  NotificationsState,
  NotificationActions,
  Notification,
  ADD_NOTIFICATION,
} from '../../reducers/notifications/notifications';

type NotificationsContextType = [
  NotificationsState,
  React.Dispatch<NotificationActions>,
];

const NotificationsContext =
  React.createContext<NotificationsContextType | null>(null);

export const NotificationsProvider: FC<{children: ReactNode}> = ({
  children,
}) => {
  const [notifications, dispatch] = React.useReducer(notificationsReducer, []);
  const value = React.useMemo<NotificationsContextType>(
    () => [notifications, dispatch],
    [notifications],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export function useNotifications() {
  const context = React.useContext(NotificationsContext);

  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  const [notifications, dispatch] = context;

  const add = (payload: Notification) =>
    dispatch({type: ADD_NOTIFICATION, payload});

  return {
    notifications,
    dispatch,
    add,
  };
}

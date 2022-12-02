export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type Notification = {
  date: string;
  text: string;
  title: string;
  type: NotificationType;
  viewsCount: number;
};
export type NotificationsState = Array<Notification>;
export type NotificationActions =
  | {
      type: typeof ADD_NOTIFICATION;
      payload: Notification;
    }
  | {
      type: typeof READ_NOTIFICATION;
    };

export function notificationsReducer(
  state: NotificationsState,
  action: NotificationActions,
) {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return [...state, action.payload];
    }

    case READ_NOTIFICATION: {
      return [...state.slice(1, state.length)];
    }

    default: {
      return state;
    }
  }
}

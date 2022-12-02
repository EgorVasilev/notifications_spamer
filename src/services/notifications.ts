import {Notification} from '../reducers/notifications/notifications';

interface NotificationsService {
  readonly notifications: Notification[];
  subscribe: (callback: (notification: Notification) => unknown) => {
    unsubscribe: () => void;
  };
  add: (notification: Notification) => void;
  remove: (index: number) => void;
}

export const notificationsService: NotificationsService = {
  notifications: [
    {
      date: new Date('2022-09-11').toISOString(),
      text: 'Hello there',
      title: 'Hi',
      type: 'success',
      viewsCount: 0,
    },
    {
      date: new Date('2022-11-11').toISOString(),
      text: 'See you soon',
      title: 'Bye',
      type: 'error',
      viewsCount: 1,
    },
    {
      date: new Date('2022-10-11').toISOString(),
      text: 'How is it going, buddy?',
      title: "What's up?",
      type: 'warning',
      viewsCount: 2,
    },
  ],

  subscribe: function (callback) {
    const self = this;

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * self.notifications.length);
      const randomNotification = self.notifications[randomIndex];

      callback(randomNotification);
    }, 4000);

    return {
      unsubscribe: function () {
        clearInterval(intervalId);
      },
    };
  },

  add: function (notification) {
    this.notifications.push(notification);
  },
  remove: function (index) {
    this.notifications.splice(index, 1);
  },
};

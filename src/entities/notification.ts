import {DATE_ISO_STRING} from '../constants/regExps';

export type NotificationTitle = string & {__brand: 'title'};
export type NotificationText = string & {__brand: 'text'};
export type NotificationDate = string & {__brand: 'date'};
export type NotificationViewsCount = number & {__brand: 'viewsCount'};
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type Notification = {
  title: NotificationTitle;
  text: NotificationText;
  date: NotificationDate;
  viewsCount: NotificationViewsCount;
  type: NotificationType;
};

export function createTitle(value: string): NotificationTitle {
  if (value === '') {
    throw new Error('Empty title value');
  }

  if (value.length > 100) {
    throw new Error('Too long title value');
  }

  return value as NotificationTitle;
}

export function createText(value: string): NotificationText {
  if (value === '') {
    throw new Error('Empty text value');
  }

  if (value.length > 500) {
    throw new Error('Too long text value');
  }

  return value as NotificationText;
}

export function createDate(value: string): NotificationDate {
  if (value === '') {
    throw new Error('Empty date value');
  }

  if (!RegExp(DATE_ISO_STRING).test(value)) {
    throw new Error('Date string must be in ISO format');
  }

  return value as NotificationDate;
}

export function createViewsCount(value: number): NotificationViewsCount {
  if (value < 0) {
    throw new Error('Count cant be lower than 0');
  }

  return value as NotificationViewsCount;
}

export function createNotification({
  date,
  text,
  title,
  type,
  viewsCount,
}: {
  title: string;
  text: string;
  date: string;
  viewsCount: number;
  type: NotificationType;
}): Notification {
  return {
    title: createTitle(title),
    text: createText(text),
    date: createDate(date),
    viewsCount: createViewsCount(viewsCount),
    type,
  };
}

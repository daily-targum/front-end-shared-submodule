import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const formatDateAbriviated = (date: number | string): string => {
  const utcOffset = dayjs().utcOffset();
  const now = dayjs().utc();
  const articleDate = dayjs((+date) * 1000, {utc: true}).utcOffset(utcOffset);
  const minDiff = now.diff(articleDate, 'minute');
  const hourDiff = now.diff(articleDate, 'hour');
  const dayDiff = now.diff(articleDate, 'day');
  const yearDiff = now.diff(articleDate, 'year');

  if(minDiff < 1) {
    return 'Now';
  } else if(minDiff === 1) {
    return `${minDiff} minute ago`;
  } else if(minDiff < 60) {
    return `${minDiff} minutes ago`;
  } else if(hourDiff === 1) {
    return `${hourDiff} hour ago`;
  } else if(hourDiff < 24) {
    return `${hourDiff} hours ago`;
  } else if(dayDiff === 1) {
    return `${dayDiff} day ago`;
  } else if(dayDiff < 7) {
    return `${dayDiff} days ago`;
  } else if(yearDiff < 1) {
    return articleDate.format('MMM D');
  } else {
    return articleDate.format('MMM D YYYY');
  }
}

export const formatDate = (date: number | string) => {
  const utcOffset = dayjs().utcOffset();
  return dayjs((+date) * 1000, {utc: true}).utcOffset(utcOffset).format('MMM D, YYYY, h:mm A');
}
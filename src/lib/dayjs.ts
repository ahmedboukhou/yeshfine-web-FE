import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
export const getRelativeTimeString = (timestamp: string) => dayjs(timestamp).fromNow();

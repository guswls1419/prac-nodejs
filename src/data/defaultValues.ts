import dayjs from 'dayjs';

export const listDefaultValues = {
  total: 52,
  list: [
    {
      isChecked: false,
      title: 'LunchLunchLunchLunchLunchLunchLunchLunchLunchLunchLunch',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: '',
      id: '1',
    },
    {
      isChecked: true,
      title: 'Lunch',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: '',
      id: '2',
    },
    {
      isChecked: false,
      title: 'Lunch',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: '',
      id: '3',
    },
    {
      isChecked: false,
      title: 'Lunch',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: '',
      id: '4',
    },
  ],
};

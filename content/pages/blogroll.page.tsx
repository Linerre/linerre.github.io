import { IBItem } from '../_includes/types.ts';

// Override the layout defined in _data.yml
export const layout = 'blogroll.tsx';

// Blogroll data
export const rollList: IBItem[] = [
  { date: new Date('2015-02-01'),
    title: 'What Color is Your Function?',
    url: 'https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/',
    domain: 'journal.stuffwithstuff.com',
    qorc: 'You can await if and only if you are within async.',
    author: 'Bob Nystrom'
  },
  { date: new Date('2024-12-19'),
    title: 'How Does Bitcoin Work?',
    url: 'https://learnmeabitcoin.com/beginners/how-does-bitcoin-work/',
    domain: 'learnmeabitcoin.com',
    qorc: '"Bitcoin is just a computer program."',
    author: 'Greg Walker'
  },
];

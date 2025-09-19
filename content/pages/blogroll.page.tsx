import { IBItem } from '../_includes/types.ts';

// Override the layout defined in _data.yml
export const layout = 'blogroll.tsx';

// Blogroll data
export const rollList: IBItem[] = [
  { date: new Date('2025-06-03'),
    title: 'Memory Allocation in Go?',
    url: 'https://nghiant3223.github.io/2025/06/03/memory_allocation_in_go.html',
    domain: 'nghiant3223.github.io',
    qorc: 'Remind me of the golden days when studying CSAPP (CMU 15-213).',
    author: 'Melatoni'
  },
  { date: new Date('2024-12-19'),
    title: 'How Does Bitcoin Work?',
    url: 'https://learnmeabitcoin.com/beginners/how-does-bitcoin-work/',
    domain: 'learnmeabitcoin.com',
    qorc: '"Bitcoin is just a computer program."',
    author: 'Greg Walker'
  },
  { date: new Date('2024-02-22'),
    title: 'JavaScript Bloat in 2024?',
    url: 'https://tonsky.me/blog/js-bloat/',
    domain: 'tonsky.me',
    qorc: 'I tried hard to make this site free of JavaScript.',
    author: 'Tonsky'
  },
  { date: new Date('2015-02-01'),
    title: 'What Color is Your Function?',
    url: 'https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function/',
    domain: 'journal.stuffwithstuff.com',
    qorc: 'You can await if and only if you are within async.',
    author: 'Bob Nystrom'
  },
];

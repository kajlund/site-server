import crypto from 'crypto'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('proverbs').del()
  await knex('proverbs').insert([
    {
      id: crypto.randomUUID(),
      title: 'Programming',
      content: 'Programming isn’t about what you know; it’s about what you can figure out.',
      description: 'Author of Learn to Program',
      author: 'Chris Pine',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Understandable Code',
      content:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      description: '',
      author: 'Martin Fowler',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Divide and Conquer',
      content:
        'The most fundamental problem in software development is complexity. There is only one basic way of dealing with complexity: divide and conquer',
      description: '',
      author: 'Bjarne Stroustrup',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Great Habits',
      content: 'I’m not a great programmer. I’m just a good programmer with great habits.',
      description: '',
      author: 'Kent Beck',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Community',
      content:
        "When you choose a language, you're choosing more than a set of technical trade-offs - You're choosing a community.",
      description: '',
      author: 'Joshua Bloch',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Throwing Code',
      content: 'One of my most productive days was throwing away 1,000 lines of code.',
      description: '',
      author: 'Ken Thompson',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Development Time',
      content:
        'The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time.',
      description: '',
      author: 'Tom Cargill',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Debugging',
      content:
        'The art of debugging is figuring out what you really told your program to do rather than what you thought you told it to do.',
      description: '',
      author: 'Andrew Singer',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Simplicity',
      content:
        'There are two methods of software design. One is to make the program so simple, there are obviously no errors. The other is to make it so complicated, there are no obvious errors.',
      description: 'Inventor of the quicksort algorithm',
      author: 'Tony Hoare',
      category: 'IT',
    },
    {
      id: crypto.randomUUID(),
      title: 'Requirements',
      content: '99.7% of software development in one requirement. A user should be able to view a list of items.',
      description: '',
      author: 'Sam Saccone',
      category: 'IT',
    },
  ])
}

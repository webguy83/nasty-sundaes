import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Pineapple', imagePath: '/images/fuckpinepple.png' },
        { name: 'Apple', imagePath: '/images/fuckapple.png' },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'Hot Bitch', imagePath: '/images/hotbitch.png' },
      ])
    );
  }),
];

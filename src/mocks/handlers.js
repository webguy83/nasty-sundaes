import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Pineapple', imagePath: '/images/fuckpinepple.png' },
        { name: 'Apple', imagePath: '/images/fuckapple.png' },
        { name: 'Cina', imagePath: '/images/cina.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    );
  }),
  rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'Hot Bitch', imagePath: '/images/hotbitch.png' },
        { name: 'Mint', imagePath: '/images/mint.png' },
      ])
    );
  }),
  rest.post('http://localhost:3030/order', (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 6969696969696969 }));
  }),
];

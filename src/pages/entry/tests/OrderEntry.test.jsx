import { render, screen, waitFor } from '../../../test-utils/testing-lib-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';
import userEvent from '@testing-library/user-event';

it('should throw an error for scoop and topping routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

it('should have the button disabled by default', () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const btn = screen.getByRole('button', { name: 'Checkout' });
  expect(btn).toBeDisabled();
});

it('should enable the button once enough ingredients', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const vanillaInputElm = await screen.findByTestId('Vanilla');
  userEvent.clear(vanillaInputElm);
  userEvent.type(vanillaInputElm, '1');

  const btn = screen.getByRole('button', { name: 'Checkout' });
  expect(btn).toBeEnabled();
});

it('should enable the button and disable the button after removing', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const vanillaInputElm = await screen.findByTestId('Vanilla');
  userEvent.clear(vanillaInputElm);
  userEvent.type(vanillaInputElm, '1');
  userEvent.clear(vanillaInputElm);
  userEvent.type(vanillaInputElm, '0');

  const btn = screen.getByRole('button', { name: 'Checkout' });
  expect(btn).toBeDisabled();
});

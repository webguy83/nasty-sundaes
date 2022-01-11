import { render, screen } from '../../../test-utils/testing-lib-utils';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

it('should display for each scoop from the server', async () => {
  render(<Options optionType='scoops' />, {
    wrapper: OrderDetailsProvider,
  });

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(['Pineapple Scoop', 'Apple Scoop']);

  const heading = screen.getByText('Scoops');
  expect(heading).toBeInTheDocument();
});

it('should display for each topping in the server', async () => {
  render(<Options optionType='toppings' />);

  const scoopImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(['Cherries Topping', 'Hot Bitch Topping']);

  const heading = screen.getByText('Toppings');
  expect(heading).toBeInTheDocument();
});

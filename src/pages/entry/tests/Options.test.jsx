import { render, screen } from '../../../test-utils/testing-lib-utils';
import Options from '../Options';

it('should display for each scoop from the server', async () => {
  render(<Options optionType='scoops' />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(4);

  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(['Pineapple Scoop', 'Apple Scoop', 'Cina Scoop', 'Vanilla Scoop']);

  const heading = screen.getByText('Scoops');
  expect(heading).toBeInTheDocument();
});

it('should display for each topping in the server', async () => {
  render(<Options optionType='toppings' />);

  const scoopImages = await screen.findAllByRole('img', { name: /topping$/i });
  expect(scoopImages).toHaveLength(3);

  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(['Cherries Topping', 'Hot Bitch Topping', 'Mint Topping']);

  const heading = screen.getByText('Toppings');
  expect(heading).toBeInTheDocument();
});

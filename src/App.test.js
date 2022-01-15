import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function getListItems(list) {
  const { getAllByRole } = within(list);
  return getAllByRole('listitem');
}

describe('happy order', () => {
  it('do all the happy order fun', async () => {
    render(<App />);

    const vanillaInputElm = await screen.findByRole('spinbutton', { name: /pineapple/i });
    userEvent.clear(vanillaInputElm);
    userEvent.type(vanillaInputElm, '7');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    const bitchCheckbox = await screen.findByRole('checkbox', { name: /bitch/i });
    const mintCheckbox = await screen.findByRole('checkbox', { name: /mint/i });

    userEvent.click(bitchCheckbox);
    userEvent.click(cherriesCheckbox);
    userEvent.click(mintCheckbox);

    const orderBtnElm = screen.getByRole('button', { name: /checkout/i });
    userEvent.click(orderBtnElm);

    const scoopsTextTotal = screen.getByText('Scoops: $14.00');
    expect(scoopsTextTotal).toBeInTheDocument();

    const scoopList = screen.getByRole('list', {
      name: /scoops/i,
    });

    const scoopNames = getListItems(scoopList).map((scoop) => scoop.textContent);
    expect(scoopNames).toEqual(['Pineapple']);
    expect(scoopNames.length).toBe(1);

    const toppingList = screen.getByRole('list', {
      name: /toppings/i,
    });

    const toppingNames = getListItems(toppingList).map((topping) => topping.textContent);
    expect(toppingNames).toEqual(['Hot Bitch', 'Cherries', 'Mint']);
    expect(toppingNames.length).toBe(3);

    const toppingsTextTotal = screen.getByText('Toppings: $4.50');
    expect(toppingsTextTotal).toBeInTheDocument();

    const grandTotal = screen.getByText('Total: $18.50');
    expect(grandTotal).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });
    const btn = screen.getByRole('button', { name: 'Confirm Order' });

    userEvent.click(checkbox);
    userEvent.click(btn);

    const orderNumberTextElm = await screen.findByText(
      'Your order number will be 6969696969696969. Keep it handy you moron.'
    );
    expect(orderNumberTextElm).toBeInTheDocument();

    const newOrderBtn = screen.getByRole('button', { name: 'Create new order' });
    userEvent.click(newOrderBtn);

    expect(scoopsTextTotal).toHaveTextContent('Scoops: $0.00');
    expect(toppingsTextTotal).toHaveTextContent('Toppings: $0.00');
  });
});

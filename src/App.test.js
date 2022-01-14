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

    const pineappleInputElm = await screen.findByRole('spinbutton', { name: /pineapple/i });
    userEvent.clear(pineappleInputElm);
    userEvent.type(pineappleInputElm, '4');

    const appleInputElm = await screen.findByRole('spinbutton', { name: /apple/i });
    userEvent.clear(appleInputElm);
    userEvent.type(appleInputElm, '3');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    const bitchCheckbox = await screen.findByRole('checkbox', { name: /bitch/i });

    userEvent.click(bitchCheckbox);
    userEvent.click(cherriesCheckbox);

    const orderBtnElm = screen.getByRole('button', { name: /checkout/i });
    userEvent.click(orderBtnElm);

    const scoopsTextTotal = screen.getByText('Scoops: $8.00');
    expect(scoopsTextTotal).toBeInTheDocument();

    const scoopList = screen.getByRole('list', {
      name: /scoops/i,
    });

    const scoopNames = getListItems(scoopList).map((scoop) => scoop.textContent);
    expect(scoopNames).toEqual(['Pineapple', 'Apple']);
    expect(scoopNames.length).toBe(2);

    const toppingList = screen.getByRole('list', {
      name: /toppings/i,
    });

    const toppingNames = getListItems(toppingList).map((topping) => topping.textContent);
    expect(toppingNames).toEqual(['Cherries', 'Hot Bitch']);
    expect(toppingNames.length).toBe(2);

    const toppingsTextTotal = screen.getByText('Toppings: $3.00');
    expect(toppingsTextTotal).toBeInTheDocument();

    const grandTotal = screen.getByText('Total: $11.00');
    expect(grandTotal).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });
    const btn = screen.getByRole('button', { name: 'Confirm Order' });

    userEvent.click(checkbox);
    userEvent.click(btn);

    const orderNumberTextElm = await screen.findByText(/6969696969696969/);
    expect(orderNumberTextElm).toHaveTextContent('Your order number is 6969696969696969');

    const newOrderBtn = screen.getByRole('button', { name: 'Create new order' });
    userEvent.click(newOrderBtn);

    expect(scoopsTextTotal).toHaveTextContent('Scoops: $0.00');
    expect(toppingsTextTotal).toHaveTextContent('Toppings: $0.00');
  });
});

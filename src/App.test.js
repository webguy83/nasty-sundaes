import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

function getListItems(list) {
  const { queryAllByRole } = within(list);
  return queryAllByRole('listitem');
}

describe('happy order', () => {
  it('do all the happy order fun', async () => {
    render(<App />);

    const vanillaInputElm = await screen.findByTestId('Vanilla');
    userEvent.clear(vanillaInputElm);
    userEvent.type(vanillaInputElm, '7');

    const appleInputElm = await screen.findByTestId('Apple');
    userEvent.clear(appleInputElm);
    userEvent.type(appleInputElm, '1');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
    const bitchCheckbox = await screen.findByRole('checkbox', { name: /bitch/i });
    const mintCheckbox = await screen.findByRole('checkbox', { name: /mint/i });

    userEvent.click(bitchCheckbox);
    userEvent.click(cherriesCheckbox);
    userEvent.click(mintCheckbox);

    const orderBtnElm = screen.getByRole('button', { name: /checkout/i });
    userEvent.click(orderBtnElm);

    const scoopsTextTotal = screen.getByText('Scoops: $16.00');
    expect(scoopsTextTotal).toBeInTheDocument();

    const scoopList = screen.getByRole('list', {
      name: /scoops/i,
    });

    const scoopNames = getListItems(scoopList).map((scoop) => scoop.textContent);
    expect(scoopNames).toEqual(['Vanilla', 'Apple']);
    expect(scoopNames.length).toBe(2);

    const toppingList = screen.getByRole('list', {
      name: /toppings/i,
    });

    const toppingNames = getListItems(toppingList).map((topping) => topping.textContent);
    expect(toppingNames).toEqual(['Hot Bitch', 'Cherries', 'Mint']);
    expect(toppingNames.length).toBe(3);

    const toppingsTextTotal = screen.getByText('Toppings: $4.50');
    expect(toppingsTextTotal).toBeInTheDocument();

    const grandTotal = screen.getByText('Total: $20.50');
    expect(grandTotal).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });
    const btn = screen.getByRole('button', { name: 'Confirm Order' });

    userEvent.click(checkbox);
    userEvent.click(btn);

    const orderNumberTextElm = await screen.findByText(
      'Your order number will be 6969696969696969. Keep it handy you moron.'
    );
    expect(orderNumberTextElm).toBeVisible();

    const newOrderBtn = screen.getByRole('button', { name: 'Create new order' });
    userEvent.click(newOrderBtn);

    const updatedScoopsTextTotal = screen.getByText('Scoops total: $0.00');
    const updatedToppingsTextTotal = screen.getByText('Scoops total: $0.00');
    expect(updatedScoopsTextTotal).toBeInTheDocument();
    expect(updatedToppingsTextTotal).toBeInTheDocument();
  });

  it('should not render toppings if there are no toppings in summary', async () => {
    render(<App />);

    const vanillaInputElm = await screen.findByTestId('Vanilla');
    userEvent.clear(vanillaInputElm);
    userEvent.type(vanillaInputElm, '6');

    const orderBtnElm = screen.getByRole('button', { name: /checkout/i });
    userEvent.click(orderBtnElm);

    const toppingsHeadingElm = screen.queryByText(/toppings/i);
    expect(toppingsHeadingElm).not.toBeInTheDocument();
  });
});

import { render, screen } from '../../../test-utils/testing-lib-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

it('should update the subtotal when the scoops change', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  const scoopsSubTotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubTotal).toHaveTextContent('$0');

  const pineappleInputElm = await screen.findByRole('spinbutton', { name: /pineapple/i });
  userEvent.clear(pineappleInputElm);
  userEvent.type(pineappleInputElm, '1');

  expect(scoopsSubTotal).toHaveTextContent('$2');

  const appleInputElm = await screen.findByRole('spinbutton', { name: /apple/i });
  userEvent.clear(appleInputElm);
  userEvent.type(appleInputElm, '2');

  expect(scoopsSubTotal).toHaveTextContent('$4');
});

it('should update the subtotal when the toppings change', async () => {
  render(<Options optionType='toppings' />);

  const toppingsSubTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(toppingsSubTotal).toHaveTextContent('$0');

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: /cherries/i });
  const bitchCheckbox = await screen.findByRole('checkbox', { name: /bitch/i });

  expect(cherriesCheckbox).not.toBeChecked();
  expect(bitchCheckbox).not.toBeChecked();

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubTotal).toHaveTextContent('$1.50');

  userEvent.click(bitchCheckbox);
  expect(toppingsSubTotal).toHaveTextContent('$3.00');

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubTotal).toHaveTextContent('$1.50');
});

describe('grand total', () => {
  it('should start off with a grand total of 0 dollars and to be in the document', () => {
    render(<OrderEntry />);

    const grandTotalElm = screen.getByText(/grand total/i);
    expect(grandTotalElm).toBeInTheDocument();
    expect(grandTotalElm).toHaveTextContent('$0.00');
  });
  it('should update the grand total if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotalElm = screen.getByText(/grand total/i);

    const pineappleInputElm = await screen.findByRole('spinbutton', { name: /pineapple/i });
    userEvent.clear(pineappleInputElm);
    userEvent.type(pineappleInputElm, '1');

    expect(grandTotalElm).toHaveTextContent('$2');
  });
  it('should update the grand total if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotalElm = screen.getByText(/grand total/i);

    const pineappleInputElm = await screen.findByRole('spinbutton', { name: /pineapple/i });
    userEvent.clear(pineappleInputElm);
    userEvent.type(pineappleInputElm, '1');

    const bitchCheckbox = await screen.findByRole('checkbox', { name: /bitch/i });
    userEvent.click(bitchCheckbox);

    expect(grandTotalElm).toHaveTextContent('$3.50');
  });
  it('should update the grand total if an item is removed', async () => {
    render(<OrderEntry />);

    const grandTotalElm = screen.getByText(/grand total/i);

    const pineappleInputElm = await screen.findByRole('spinbutton', { name: /pineapple/i });
    userEvent.clear(pineappleInputElm);
    userEvent.type(pineappleInputElm, '1');

    const bitchCheckbox = await screen.findByRole('checkbox', { name: /bitch/i });
    userEvent.click(bitchCheckbox);
    userEvent.click(bitchCheckbox);

    expect(grandTotalElm).toHaveTextContent('$2.00');
  });
});

import { render, screen } from '../../../test-utils/testing-lib-utils';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

it('should udpate the subtotal when the scoops change', async () => {
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

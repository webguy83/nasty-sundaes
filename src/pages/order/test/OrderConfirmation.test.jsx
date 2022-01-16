import { render, screen } from '../../../test-utils/testing-lib-utils';
import OrderConfirmation from '../OrderConfirmation';

describe('Order Confirmation', () => {
  it('should show a preloader spinner before loading order number', () => {
    render(<OrderConfirmation />);

    const spinnerElm = screen.getByRole('progressbar');
    const orderNumberTextElm = screen.queryByText(
      'Your order number will be 6969696969696969. Keep it handy you moron.'
    );
    expect(spinnerElm).toBeInTheDocument();
    expect(orderNumberTextElm).not.toBeInTheDocument();
  });

  it('should load the content and hide the preloader after all is loaded', async () => {
    render(<OrderConfirmation />);

    const orderNumberTextElm = await screen.findByText(
      'Your order number will be 6969696969696969. Keep it handy you moron.'
    );
    const spinnerElm = screen.queryByRole('progressbar');

    expect(orderNumberTextElm).toBeInTheDocument();
    expect(spinnerElm).not.toBeInTheDocument();
  });
});

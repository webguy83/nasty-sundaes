import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

it('should have the checkbox and button disabled by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });
  const btn = screen.getByRole('button', { name: 'Confirm Order' });
  expect(checkbox).not.toBeChecked();
  expect(btn).toBeDisabled();
});

it('should enabled the button if the checkbox is checked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });
  const btn = screen.getByRole('button', { name: 'Confirm Order' });
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(btn).toBeEnabled();
});

it('should be disabled after the checkbox is unchecked after checked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: /Terms and Conditions/i });
  const btn = screen.getByRole('button', { name: 'Confirm Order' });
  userEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(btn).toBeDisabled();
});

it('should open a popover when hover on Terms of Conditions', async () => {
  render(<SummaryForm />);
  const popOverNull = screen.queryByText(/no stupid ice cream will be made morons/i);
  expect(popOverNull).not.toBeInTheDocument();

  const tacElm = screen.getByText(/terms and conditions/i);
  userEvent.hover(tacElm);

  const popOver = screen.queryByText(/no stupid ice cream will be made morons/i);
  expect(popOver).toBeInTheDocument();

  userEvent.unhover(tacElm);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no stupid ice cream will be made morons/i)
  );
});

import { fireEvent, render, screen } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

it('should have the checkbox and button disabled by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: 'Terms and Conditions' });
  const btn = screen.getByRole('button', { name: 'Confirm Order' });
  expect(checkbox).not.toBeChecked();
  expect(btn).toBeDisabled();
});

it('should enabled the button if the checkbox is checked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: 'Terms and Conditions' });
  const btn = screen.getByRole('button', { name: 'Confirm Order' });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(btn).toBeEnabled();
});

it('should be disabled after the checkbox is unchecked after checked', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', { name: 'Terms and Conditions' });
  const btn = screen.getByRole('button', { name: 'Confirm Order' });
  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(btn).toBeDisabled();
});

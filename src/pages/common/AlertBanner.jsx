import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertBanner({ message, variant }) {
  return (
    <Alert severity={variant || 'error'}>
      <AlertTitle>Error</AlertTitle>
      {message || 'An unexpected error happened. Better luck next time moron.'}
    </Alert>
  );
}

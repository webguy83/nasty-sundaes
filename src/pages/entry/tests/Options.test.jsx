import { render, screen } from '@testing-library/react';
import Options from '../Options';

it('should displays for each scoop from the server', async () => {
  render(<Options optionType='scoops' />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(['Pineapple Scoop', 'Apple Scoop']);
});

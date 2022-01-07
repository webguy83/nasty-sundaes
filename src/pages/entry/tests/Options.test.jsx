import { render, screen } from '@testing-library/react';
import Options from '../Options';

it('should displays for each scoop from the server', () => {
  render(<Options optionType='scoop' />);

  const scoopImages = screen.getAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(['Pineapple scoop', 'Apple scoop']);
});

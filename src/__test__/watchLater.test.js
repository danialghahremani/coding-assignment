import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './utils';
import App from '../App';

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

it('Watch Later movies page', async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump');
  // @TODO
  await waitFor(() => {
    expect(
      screen.getAllByText('Through the Eyes of Forrest Gump')[0]
    ).toBeInTheDocument();
  });
  const watchLaterLink = screen.getAllByTestId('watch-later')[0];
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument();
  });
  await userEvent.click(watchLaterLink);
});
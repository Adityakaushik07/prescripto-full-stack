import { Providers } from './providers';

/**
 * Root component. Currently renders only the app name inside the providers;
 * routes and layouts will be wired in during the theme + layout step.
 */
export const App = () => {
  return (
    <Providers>
      <h1>CareHub</h1>
    </Providers>
  );
};
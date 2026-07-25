import { Providers } from './providers';
import { AppRoutes } from './routes';

/** Root component — providers wrap the full route tree. */
export const App = () => {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  );
};
import { Suspense } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Spinner } from '../common/Spinner';

/**
 * Every lazy-loaded route needs both: Suspense to show something while its
 * code chunk downloads, and an ErrorBoundary in case that chunk fails to
 * load or the page throws once it renders. Bundling them here means every
 * layout gets both by wrapping its <Outlet /> in this one component.
 */
export function AsyncBoundary({ children, fallback }) {
  return (
    <ErrorBoundary message="This page failed to load.">
      <Suspense
        fallback={
          fallback ?? (
            <div className="flex justify-center py-24">
              <Spinner size={32} />
            </div>
          )
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

import { ComponentProps, ComponentRef, forwardRef, Suspense } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

type ErrorBoundaryProps = Omit<
  ComponentProps<typeof ErrorBoundary>,
  'renderFallback'
>;
type SuspenseProps = Omit<ComponentProps<typeof Suspense>, 'fallback'>;

type Props = SuspenseProps &
  ErrorBoundaryProps & {
    rejectedFallback: ComponentProps<typeof ErrorBoundary>['renderFallback'];
    pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  };

const AsyncBoundary = forwardRef<ComponentRef<typeof ErrorBoundary>, Props>(
  (
    { pendingFallback, rejectedFallback, children, ...errorBoundaryProps },
    resetRef
  ) => (
    <ErrorBoundary
      ref={resetRef}
      renderFallback={rejectedFallback}
      {...errorBoundaryProps}
    >
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
);

AsyncBoundary.displayName = 'AsyncBoundary';

export default AsyncBoundary;

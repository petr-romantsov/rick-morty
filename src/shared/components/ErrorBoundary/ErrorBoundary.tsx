import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react';

import './ErrorBoundary.scss';

type TErrorBoundaryComponentProps = {
  children: ReactNode;
};

type TErrorBoundaryComponentState = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<TErrorBoundaryComponentProps, TErrorBoundaryComponentState> {
  constructor(props: PropsWithChildren<TErrorBoundaryComponentProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryComponentState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error caught:', error, info);
    this.setState({ error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary'>
          <h2 className='error-boundary__title'>
            Something went wrong:
            <span className='error-boundary__message'> {this.state.error?.message}</span>
          </h2>
        </div>
      );
    }

    return this.props.children;
  }
}

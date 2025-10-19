'use client';

import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState, ErrorInfo } from '@/types';

export class ImageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Error logging can be added here if needed
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-full w-full bg-neutral-800 rounded-lg">
            <div className="text-center text-neutral-400 p-4">
              <svg 
                className="w-8 h-8 mx-auto mb-2 opacity-50" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
              <p className="text-xs">Failed to load content</p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
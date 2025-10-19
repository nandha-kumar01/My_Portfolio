"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): State {
    return {
      hasError: true,
      error: _error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === "production") {
      // You can integrate with error monitoring services like Sentry here
      this.logErrorToService(error);
    }

    this.setState({
      error,
      errorInfo: errorInfo.componentStack || undefined,
    });
  }

  private logErrorToService(_error: Error) {
    // Integration with error monitoring services
    try {
      // Example: Sentry.captureException(_error, { contexts: { react: errorInfo } });
    } catch {
    }
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              <p className="text-gray-400">
                We apologize for the inconvenience. An unexpected error occurred.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="text-left bg-gray-900 p-4 rounded-lg border border-gray-700">
                <summary className="cursor-pointer text-yellow-400 hover:text-yellow-300">
                  Error Details
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong className="text-red-400">Error:</strong>
                    <code className="block text-sm text-gray-300 bg-gray-800 p-2 rounded mt-1">
                      {this.state.error.message}
                    </code>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong className="text-red-400">Stack Trace:</strong>
                      <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded mt-1 overflow-auto max-h-32">
                        {this.state.errorInfo}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleRefresh}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (_error: Error, _errorInfo?: string) => {
    if (process.env.NODE_ENV === "production") {
      // Log to monitoring service
      try {
        // Example: Sentry.captureException(_error);
      } catch (_e) {
        // Silently fail if error logging fails
      }
    }
  };
}
import { useLang } from "@/lib/contexts/root.context";
import { getErrorMessage, globalErrorHandler } from "@/lib/utils/error.utils";
import { Button, Result, Typography } from "antd";
import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console and show notification
    console.error("Error Boundary caught an error:", error, errorInfo);
    globalErrorHandler(error);

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      const errorMessage = getErrorMessage(
        this.state.error,
        "Something went wrong!"
      );

      return (
        <ErrorBoundaryContent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorMessage={errorMessage}
          onReset={this.handleReset}
          onReload={this.handleReload}
        />
      );
    }

    return this.props.children;
  }
}

// Functional component to use hooks for translations
const ErrorBoundaryContent: React.FC<{
  error?: Error;
  errorInfo?: ErrorInfo;
  errorMessage: string;
  onReset: () => void;
  onReload: () => void;
}> = ({ error, errorInfo, errorMessage, onReset, onReload }) => {
  const { t } = useLang();

  return (
    <div className="h-full min-h-screen grid place-items-center p-4">
      <Result
        status="error"
        title={t("errorBoundary:title")}
        subTitle={
          <div className="space-y-2">
            <Typography.Text className="text-gray-600">
              {t("errorBoundary:subtitle")}
            </Typography.Text>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 p-4 bg-gray-50 rounded border text-left">
                <summary className="cursor-pointer font-medium text-red-600 mb-2">
                  {t("errorBoundary:errorDetails")}
                </summary>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Error:</strong> {errorMessage}
                  </div>
                  {error?.stack && (
                    <div>
                      <strong>Stack Trace:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1 p-2 bg-white border rounded">
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  {errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1 p-2 bg-white border rounded">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </div>
        }
        extra={
          <div className="space-x-2">
            <Button type="default" onClick={onReset}>
              {t("common:tryAgain")}
            </Button>
            <Button type="primary" onClick={onReload}>
              {t("common:reloadPage")}
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default ErrorBoundary;

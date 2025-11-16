import { Button, Space, Typography } from "antd";
import React, { useState } from "react";

interface Props {}

const ErrorBoundaryTestPage: React.FC<Props> = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error(
      "This is a test error thrown by the Error Boundary Test component!"
    );
  }

  const triggerError = () => {
    setShouldThrow(true);
  };

  const triggerAsyncError = async () => {
    // Simulate async error
    setTimeout(() => {
      throw new Error(
        "This is an async error that should be caught by the error boundary!"
      );
    }, 100);
  };

  const triggerPromiseRejection = () => {
    // This won't be caught by error boundary as it's an unhandled promise rejection
    Promise.reject(
      new Error(
        "Unhandled promise rejection - this won't be caught by error boundary"
      )
    );
  };

  return (
    <div className="p-6">
      <Typography.Title level={2}>Error Boundary Test Page</Typography.Title>

      <Typography.Paragraph>
        This page allows you to test the Error Boundary functionality. Use the
        buttons below to trigger different types of errors and see how they're
        handled.
      </Typography.Paragraph>

      <Space direction="vertical" size="middle">
        <div>
          <Typography.Title level={4}>
            Component Error (Will be caught)
          </Typography.Title>
          <Typography.Text>
            This will throw an error during component rendering, which will be
            caught by the Error Boundary.
          </Typography.Text>
          <br />
          <Button danger onClick={triggerError} className="mt-2">
            Trigger Component Error
          </Button>
        </div>

        <div>
          <Typography.Title level={4}>
            Async Error (Won't be caught)
          </Typography.Title>
          <Typography.Text>
            Async errors in setTimeout/setInterval are not caught by Error
            Boundaries. Check the browser console for this error.
          </Typography.Text>
          <br />
          <Button onClick={triggerAsyncError} className="mt-2">
            Trigger Async Error
          </Button>
        </div>

        <div>
          <Typography.Title level={4}>
            Promise Rejection (Won't be caught)
          </Typography.Title>
          <Typography.Text>
            Unhandled promise rejections are not caught by Error Boundaries.
            Check the browser console for this error.
          </Typography.Text>
          <br />
          <Button onClick={triggerPromiseRejection} className="mt-2">
            Trigger Promise Rejection
          </Button>
        </div>

        <div>
          <Typography.Title level={4}>Note</Typography.Title>
          <Typography.Text>
            Error Boundaries only catch errors in:
            <ul>
              <li>Component rendering</li>
              <li>Lifecycle methods</li>
              <li>Constructor of class components</li>
            </ul>
            They do NOT catch errors in:
            <ul>
              <li>Event handlers</li>
              <li>Async code (setTimeout, setInterval, etc.)</li>
              <li>Server-side rendering</li>
              <li>Errors thrown in the error boundary itself</li>
            </ul>
          </Typography.Text>
        </div>
      </Space>
    </div>
  );
};

export default ErrorBoundaryTestPage;

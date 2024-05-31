import React from "react";
import ErrorHandler from "../components/ErrorComponent";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorHandler
          errorCode={500}
          errorMessage="An unexpected error occurred."
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

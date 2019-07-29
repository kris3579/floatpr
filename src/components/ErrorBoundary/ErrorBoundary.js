import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  };

  componentDidCatch(error) {
    this.setState({error: error.message || 'Unexpected Error'});
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          ERROR: {this.state.error}
        </div>
      );
    };
    
    return (
      this.props.children
    );
  };
};
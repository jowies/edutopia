import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.button), 'MaterialButton');
  }

  componentDidUpdate() {
    componentHandler.upgradeElement(ReactDOM.findDOMNode(this.refs.button), 'MaterialButton');
  }

  render() {
    return (
      <button
        ref="button"
        onClick={this.props.onClick}
        className={this.props.className}
      >
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
};

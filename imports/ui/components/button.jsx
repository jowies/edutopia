import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class Button extends React.Component {

  componentDidMount() {
    upgrade(this.refs.button);
  }

  componentDidUpdate() {
    upgrade(this.refs.button);
  }

  componentWillUnmount() {
    downgrade(this.refs.button);
  }

  render() {
    return (
      <button
        className={this.props.className}
        ref="button"
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  style: React.PropTypes.object,
};


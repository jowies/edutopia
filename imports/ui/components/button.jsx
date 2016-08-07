import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';


export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
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
        className="mdl-button
          mdl-button--primary
          mdl-button--raised
          mdl-js-button
          mdl-js-ripple-effect"
        ref="button"
      >
        {this.props.label}
      </button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  ripple: React.PropTypes.bool,
  label: React.PropTypes.string,
};

Button.defaultProps = {
  ripple: true,
};

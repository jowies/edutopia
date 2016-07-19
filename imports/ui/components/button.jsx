import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.ripple);
    const element = this.refs.button;
    componentHandler.upgradeElement(element, 'MaterialButton');
    if (this.props.ripple) {
      componentHandler.upgradeElement(element, 'MaterialRipple');
    }
  }

  componentDidUpdate() {
    const element = this.refs.button;
    componentHandler.upgradeElement(element, 'MaterialButton');
    if (this.props.ripple) {
      componentHandler.upgradeElement(element, 'MaterialRipple');
    }
  }

  jsClass() {
    if (this.props.ripple) {
      return ( ' mdl-js-button mdl-js-ripple-effect' + this.props.className);
    }
    return ( ' mdl-js-button' + this.props.className);
  }

  render() {
    return (
      <Button
        ref="button"
        onClick={this.props.onClick}
        className={this.jsClass()}
      >
        {this.props.children}
      </Button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  className: React.PropTypes.string,
  ripple: React.PropTypes.bool,
};

Button.defaultProps = {
  ripple: true,
};

import React from 'react';
import ReactDOM from 'react-dom';

export default class Input extends React.Component {

  componentDidMount() {
    const element1 = this.refs.input;
    const element2 = this.refs.inputcontainer;
    componentHandler.upgradeElement(element1);
    componentHandler.upgradeElement(element2, 'MaterialTextfield');
  }

  componentDidUpdate() {
    const element1 = this.refs.input;
    const element2 = this.refs.inputcontainer;
    componentHandler.upgradeElement(element1);
    componentHandler.upgradeElement(element2, 'MaterialTextfield');
  }

  render() {
    return (
      <div
        className="mdl-textfield__expandable-holder mdl-js-input"
        id="sample2"
        ref="inputcontainer"
      >
        <input
          ref="input"
          value={this.props.value}
          onChange={this.props.onChange}
          className="mdl-textfield__input"
          type="text"
          id="fixed-header-drawer-exp"
        />
        <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
      </div>
    );
  }
}

Input.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

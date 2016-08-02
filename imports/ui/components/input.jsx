import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';

export default class Input extends React.Component {

  componentDidMount() {
    upgrade(this.refs.input);
  }

  componentDidUpdate() {
    upgrade(this.refs.input);
  }

  componentWillUnmount() {
    downgrade(this.refs.input);
  }

  getClassName() {
    let classname = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label';
    classname += this.props.error ? ' is-invalid' : '';
    if (this.props.value.length > 0) {
      classname += ' is-dirty';
    }
    if (document.activeElement === this.refs.textfield) {
      classname += ' is-focused';
    }

    return classname;
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        ref="input"
      >
        <input
          value={this.props.value}
          onChange={this.props.onChange}
          className="mdl-textfield__input"
          type={this.props.type}
          id={this.props.id}
          ref="textfield"
        />
        <label
          className="mdl-textfield__label"
          htmlFor={this.props.id}
        >
          {this.props.label}

        </label>
        <span className="mdl-textfield__error">{this.props.errormessage}</span>
      </div>
    );
  }
}

Input.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  error: React.PropTypes.bool,
  errormessage: React.PropTypes.arrayOf(React.PropTypes.string),
};

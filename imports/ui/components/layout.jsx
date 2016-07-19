import React from 'react';
import ReactDOm from 'react-dom';

export default class Layout extends React.Component {

  componentDidMount() {
    const element = this.refs.layout;
    componentHandler.upgradeElement(element, 'MaterialLayout');
  }

  componentDidUpdate() {
    const element = this.refs.layout;
    componentHandler.upgradeElement(element, 'MaterialLayout');
  }

  render() {
    return (
      <div
        ref="layout"
        className={this.props.className.concat(' mdl-layout mdl-js-layout')}
      >
        {this.props.children}
      </div>

      );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

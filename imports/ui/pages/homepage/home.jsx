import React from 'react';
import Button from '../../components/button.jsx';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Hello!' };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <form action="#">
          <div className="mdl-textfield mdl-js-textfield">
            <input
              value={this.state.value}
              onChange={this.handleChange}
              className="mdl-textfield__input"
              type="text" id="sample1"
            />
            <label className="mdl-textfield__label" htmlFor="sample1">Text...</label>
          </div>
        </form>
        <Button className="mdl-button mdl-js-button mdl-button--raised" label={'Button'} />
      </div>
    );
  }
}

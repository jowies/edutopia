import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';

export default class MyRoom extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    if (this.props.loading) {
      upgrade(this.refs.spinner);
    }
  }

  componentDidUpdate() {
    if (this.props.loading) {
      upgrade(this.refs.spinner);
    }
  }

  componentWillUnmount() {
    if (this.props.loading) {
      downgrade(this.refs.spinner);
    }
  }

  renderList() {
    return this.props.sessions.map((session) => (
      <div>
        <p key={session._id}>{session._id}</p>
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this.props.room ? this.props.room.nickname : <p>Loading</p>}
        {this.props.loading ? <p>Loading sessions</p> : this.renderList()}
      </div>
    );
  }
}

MyRoom.propTypes = {
  loading: React.PropTypes.bool,
  room: React.PropTypes.object,
  sessions: React.PropTypes.array,
};

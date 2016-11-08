import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import SessionItem from '../../components/sessionitem.jsx';
import CreateSession from '../../components/createsession.jsx';

export default class MyRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    this.renderList = this.renderList.bind(this);
    this.expandhandle = this.expandhandle.bind(this);
    this.done = this.done.bind(this);
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
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    // Løsbart enkelt ved å lage en loading component
    if (this.props.loading) {
      downgrade(this.refs.spinner);
    }
  }

  getSign() {
    if (this.state.expand) {
      return '-';
    }
    return '+';
  }

  done() {
    this.setState({ expand: false });
  }

  expandhandle(e) {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  expand() {
    if (this.state.expand && !this.props.loading) {
      return <CreateSession done={this.done} room={this.props.room} />;
    }
    return null;
  }

  renderList() {
    return this.props.sessions.map((session) => (
      <SessionItem key={session._id} session={session} />
    ));
  }

  render() {
    return (
      <div>
        <div className="center">
          <button ref="create" onClick={this.expandhandle} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
            {this.getSign()} Start new session
          </button>
          {this.expand()}
        </div>
        {this.props.room ? null : <p>Loading</p>}
        {this.props.loading ? <p>Loading sessions</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
      </div>
    );
  }
}

MyRoom.propTypes = {
  loading: React.PropTypes.bool,
  room: React.PropTypes.object,
  sessions: React.PropTypes.array,
  roomId: React.PropTypes.string,
};


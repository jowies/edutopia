import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import SessionItem from '../../components/sessionitem.jsx';
import CreateSingle from '../../components/createsingle.jsx';
import JoinSingle from '../../components/joinsingle.jsx';

export default class SingleSession extends React.Component {
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

  }

  componentDidUpdate() {

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
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--6-col">
            <CreateSingle />
          </div>
          <div className="mdl-cell mdl-cell--6-col">
            <JoinSingle />
          </div>
        </div>
        <h5>Your single sessions:</h5>
        {this.props.loading ? <p>Loading sessions</p> : (this.props.sessions.length > 0 ? <ul className="mdl-list list"> {this.renderList()} </ul> : <p>You have not created any single sessions</p>)}
      </div>
    );
  }
}

SingleSession.propTypes = {
  loading: React.PropTypes.bool,
  room: React.PropTypes.object,
  sessions: React.PropTypes.array,
  roomId: React.PropTypes.string,
};


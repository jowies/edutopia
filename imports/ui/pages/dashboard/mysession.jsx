import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import PostItem from '../../components/postitem.jsx';

export default class MySession extends React.Component {
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
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    if (this.props.loading) {
      downgrade(this.refs.spinner);
    }
  }

  renderList() {
    return this.props.posts.map((post) => (
      <PostItem room={post} key={post._id} />
    ));
  }

  render() {
    return (
      <div>
        {!this.props.session ? <p> Loading</p> : this.props.session.sessionName}
        {this.props.loading ? <p>Loading sessions</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
      </div>
    );
  }
}

MySession.propTypes = {
  loading: React.PropTypes.bool,
  session: React.PropTypes.object,
  posts: React.PropTypes.array,
};

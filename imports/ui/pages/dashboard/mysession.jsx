import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import PostItem from '../../components/postitem.jsx';
import Button from '../../components/button.jsx';

export default class MySession extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    if (this.props.loading) {
      upgrade(this.refs.spinner, this.refs.textfield1);
    }
  }

  componentDidUpdate() {
    if (this.props.loading) {
      upgrade(this.refs.spinner, this.refs.textfield1);
    }
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    if (this.props.loading) {
      downgrade(this.refs.spinner, this.refs.textfield1);
    }
  }

  renderList() {
    return this.props.posts.map((post) => (
      <PostItem post={post} key={post._id} />
    ));
  }

  render() {
    return (
      <div>
        <form className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
          <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
            <input className="mdl-textfield__input" type="text" id="sample3" placeholder="Enter your question..." />
          </div>
          <div className="flexDisplay flex1">
            <button className="mdl-button mdl-js-button mdl-button--icon">
                  <i className="material-icons">send</i>
                </button>
          </div>
        </form>
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

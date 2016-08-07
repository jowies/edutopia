import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import CommentItem from '../../components/commentitem.jsx';
import PostItem from '../../components/postitem.jsx';
import Button from '../../components/button.jsx';

export default class MyPost extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    console.log(this.props.post);
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
  renderList() {
    return this.props.comments.map((comment) => (
      <CommentItem key={comment._id} comment={comment} />
    ));
  }

  render() {
    return (
      <div>
        {this.props.loading ? <p>Loading Comments</p> :
          <div>
            <div>
              <PostItem post={this.props.post} />
            </div>
            <form className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
              <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
                <input className="mdl-textfield__input" type="text" id="sample3" placeholder="Enter your question..." />
              </div>
              <div className="flexDisplay flex1">
                <Button label="Post" />
              </div>
            </form>
            <ul className="mdl-list list"> {this.renderList()} </ul>
          </div>
        }
        <div className="center">
        </div>
      </div>
    );
  }
}

MyPost.propTypes = {
  loading: React.PropTypes.bool,
  post: React.PropTypes.object,
  comments: React.PropTypes.array,
};

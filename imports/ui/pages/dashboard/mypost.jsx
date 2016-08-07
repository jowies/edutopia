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
        {this.props.post ?
          <div style={{ width: '100%' }} className="demo-card-wide mdl-card mdl-shadow--2dp ">
            <div className="mdl-card__title">
              <h2 style={{ paddingLeft: '36px' }} className="mdl-card__title-text">{this.props.post.text}</h2>
            </div>
           
            <form className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
              <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
                <input className="mdl-textfield__input" type="text" id="sample3" placeholder="Enter a Comment..." />
              </div>
              <div className="flexDisplay flex1">
                <button className="mdl-button mdl-js-button mdl-button--icon">
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
           {this.props.loading ? <p>Loading Comments</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
            <div className="mdl-card__menu__left">
              <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i className="material-icons">arrow_back</i>
              </button>
            </div>
          </div>
          : <p> Loading </p>}
       
      </div>
    );
  }
}

MyPost.propTypes = {
  loading: React.PropTypes.bool,
  post: React.PropTypes.object,
  comments: React.PropTypes.array,
};

import React from 'react';
import { upgrade, downgrade } from '../helpers/upgrade.jsx';
import PostItem from '../components/postitem.jsx';
import Button from '../components/button.jsx';
import { Meteor } from 'meteor/meteor';
import { insert } from '../../../imports/api/posts/methods.js';
import { Session } from 'meteor/session';

export default class MySession extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      question: '',
    };
  }

  componentDidMount() {
    if (this.props.loading) {
      upgrade(
        this.refs.spinner,
        this.refs.textfield1,
        this.refs.layout
        );
    }
  }

  componentDidUpdate() {
    if (this.props.loading) {
      upgrade(
        this.refs.spinner,
        this.refs.textfield1,
        this.refs.layout
        );
    }
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    if (this.props.loading) {
      downgrade(
        this.refs.spinner,
        this.refs.textfield1,
        this.refs.layout
        );
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ question: e.target.value });
  }
  postQuestion(e) {
    e.preventDefault();
    const text = this.state.question;
    const sessionId = this.props.session._id;
    const createdBy = Session.get('clientId');
    insert.call({ text, sessionId, createdBy }, (err, res) => {
      console.log(res);
      if (err) {
        console.log(err);
      } else {
        this.setState({ question: '' });
      }
    });
  }
  renderList() {
    return this.props.posts.map((post) => (
      <PostItem post={post} key={post._id} />
    ));
  }

  render() {
    return (
      <div
        className="mdl-layout mdl-js-layout
            mdl-layout--fixed-header layout"
        ref="layout"
      >
        <header className="mdl-layout__header mdl-color--light-green-900" >
          <div className="mdl-layout__header-row">
            <i style={{ paddingRight: '10px' }} className="material-icons">school</i>
            <span className="mdl-layout-title">
              Edutopia
            </span>
            <div className="mdl-layout-spacer"></div>
          </div>
        </header>
        <div className="mdl-color--grey-100 mdl-color-text--grey-600">
          <form onSubmit={this.postQuestion} className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
            <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
              <input value={this.state.question} onChange={this.handleChange} className="mdl-textfield__input" type="text" id="sample3" placeholder="Enter your question..." />
            </div>
            <div className="flexDisplay flex1 flexAlignItemsCenter">
              <Button onClick={this.postQuestion} label="Post" />
            </div>
          </form>
          {this.props.loading ? <p>Loading sessions</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
        </div>
      </div>
    );
  }
}

MySession.propTypes = {
  loading: React.PropTypes.bool,
  session: React.PropTypes.object,
  posts: React.PropTypes.array,
};

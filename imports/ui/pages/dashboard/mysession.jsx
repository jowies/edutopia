import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import PostItemLecturer from '../../components/postitemlecturer.jsx';
import { Meteor } from 'meteor/meteor';
import { insert } from '../../../../imports/api/posts/methods.js';

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
    const createdBy = Meteor.userId();
    const authorType = 'Teacher';
    insert.call({ text, sessionId, createdBy, authorType }, (err, res) => {
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
      <PostItemLecturer post={post} key={post._id} />
    ));
  }

  render() {
    return (
      <div>
          <form onSubmit={this.postQuestion} className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
            <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
              <input value={this.state.question} onChange={this.handleChange} className="mdl-textfield__input" type="text" id="sample3" placeholder="Enter your question..." />
            </div>
            <div className="flexDisplay flex1 flexAlignItemsCenter">
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

import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import PostItemLecturer from '../../components/postitemlecturer.jsx';
import { Meteor } from 'meteor/meteor';
import { insert } from '../../../../imports/api/posts/methods.js';
import { end } from '../../../../imports/api/sessions/methods.js';
import Button from '../../components/button.jsx';

const sortByVotes = (a, b) => b.votes - a.votes;
const sortByDate = (a, b) => {
  const aa = new Date(a.createdAt);
  const bb = new Date(b.createdAt);
  return bb - aa;
};

export default class MySession extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.endSession = this.endSession.bind(this);
    this.sort = this.sort.bind(this);
    this.state = {
      question: '',
      sort: 'popular',
    };
  }

  componentDidMount() {
    upgrade(
      this.refs.submit,
      this.refs.textfield1,
      this.refs.sort
      );
  }

  componentDidUpdate() {
    upgrade(
      this.refs.submit,
      this.refs.textfield1,
      this.refs.sort
      );
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    downgrade(
      this.refs.submit,
      this.refs.textfield1,
      this.refs.sort
      );
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

  endSession(e) {
    e.preventDefault();
    const sessionId = this.props.session._id;
    const roomId = this.props.session.roomId;
    const path = '/dashboard/myrooms/' + roomId;
    end.call(({ sessionId }), (err) => {
      if (err) {
        console.log(err);
      } else {
        FlowRouter.go(path);
      }
    });
  }

  sort(e) {
    e.preventDefault();
    if (this.state.sort === 'popular') {
      this.setState({ sort: 'newest' });
    } else if (this.state.sort === 'newest') {
      this.setState({ sort: 'popular' });
    }
  }

  renderList() {
    let sortBy;
    if (this.state.sort === 'popular') {
      sortBy = sortByVotes;
    } else if (this.state.sort === 'newest') {
      sortBy = sortByDate;
    }
    const array = this.props.posts.sort(sortBy);
    return array.map((post) => (
      <PostItemLecturer post={post} key={post._id} />
    ));
  }

  active() {
    if (this.props.session) {
      if (this.props.session.active) {
        return (
          <Button
            className="mdl-button
                  mdl-button--raised
                  mdl-button--colored
                  mdl-color--red-900
                  mdl-color-text--red-50
                  mdl-js-button
                  mdl-js-ripple-effect
                  center"
            style={{ width: '200px', maxWidth: '100%' }}
            onClick={this.endSession}
          >
            End session
          </Button>
        );
      }
      return <h4 className="mdl-color-text--red-900" >Archived</h4>;
    }
    return <p>Loading</p>;
  }

  render() {
    return (
      <div>
        <div className="mdl-grid demo-content" >
          <div
            className="demo-charts mdl-color-white
              mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid"
          >
            <div className="mdl-cell--12-col">
              <form onSubmit={this.postQuestion} className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
                <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
                  <input value={this.state.question} onChange={this.handleChange} className="mdl-textfield__input" type="text" id="sample3" placeholder="Make a post" />
                </div>
                <div className="flexDisplay flex1 flexAlignItemsCenter">
                  <button ref="submit" className="mdl-button mdl-js-button mdl-button--icon">
                    <i className="material-icons">send</i>
                  </button>
                </div>
              </form>
            </div>
            <div
              className="demo-chart
                mdl-cell
                mdl-cell--4-col
                mdl-cell--4-col-desktop"
            >
              {!!this.props.session ? <div className="center">
                <h6 className="center">{this.props.session.joinedBy.length} users logged in</h6>
              </div> : ''}
            </div>
            <div
              className="demo-chart
                mdl-cell
                mdl-cell--4-col
                mdl-cell--4-col-desktop"
            >
              <div className="center">
                <button
                  className="mdl-button
                        mdl-button--raised
                        mdl-button--colored
                        mdl-button--primary
                        mdl-js-button
                        mdl-js-ripple-effect
                        center"
                  style={{ width: '200px', maxWidth: '100%' }}
                  ref="sort"
                  onClick={this.sort}
                >
                  Sorted by: {this.state.sort}
                </button>
              </div>
            </div>
            <div
              className="demo-chart
                mdl-cell
                mdl-cell--4-col
                mdl-cell--4-col-desktop"
            >
              <div className="center">
                {this.active()}
              </div>
            </div>
          </div>
          <div className="mdl-cell--12-col">
            {this.props.loading ? <p>Loading sessions</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
          </div>
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


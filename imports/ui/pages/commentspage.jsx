import React from 'react';
import { upgrade, downgrade } from '../../ui/helpers/upgrade.jsx';
import CommentItem from '../../ui/components/commentitem.jsx';


export default class CommentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      comment: '',
    };
  }

  componentDidMount() {
    if (this.props.loading) {
      upgrade(
        this.refs.spinner,
        this.refs.textfield1,
        this.refs.layout,
        this.refs.button1,
        this.refs.button2
        );
    }
  }

  componentDidUpdate() {
    if (this.props.loading) {
      upgrade(
        this.refs.spinner,
        this.refs.textfield1,
        this.refs.layout,
        this.refs.button1,
        this.refs.button2
        );
    }
  }

  componentWillUnmount() {
    // RATHER USE if isUpgraded(this.resf.spinner)  #PS: need to make the method
    // the way it is now, can return in error!
    // e.g. if it upgrades because of load, then it should downgrade later
    // on, but this wont happen because it isn't loading anymore.
    // Løsbart enkelt ved å lage en loading component
    if (this.props.loading) {
      downgrade(
        this.refs.spinner,
        this.refs.textfield1,
        this.refs.layout,
        this.refs.button1,
        this.refs.button2
        );
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({ question: e.target.value });
  }
  postComment(e) {
   /* e.preventDefault();
    const text = this.state.question;
    const sessionId = this.props.session._id;
    const createdBy = Meteor.userId();
    insert.call({ text, sessionId, createdBy }, (err, res) => {
      console.log(res);
      if (err) {
        console.log(err);
      } else {
        this.setState({ question: '' });
      }
    }); */
  }
  goBack() {
  }
  renderList() {
    return this.props.comments.map((comment) => (
      <CommentItem key={comment._id} comment={comment} />
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

        {this.props.post ?
          <div style={{ width: '100%' }} className="demo-card-wide mdl-card mdl-shadow--2dp ">
            <div className="mdl-card__title">
              <h2 style={{ paddingLeft: '36px' }} className="mdl-card__title-text">{this.props.post.text}</h2>
            </div>
           
            <form onSubmit={this.postComment} className="flexDisplay flexDirectionRow" style={{ paddingTop: '10px' }} action="#">
              <div style={{ paddingRight: '10px', paddingLeft: '10px' }} ref="textfield1" className="mdl-textfield mdl-js-textfield flexDisplay flex9">
                <input value={this.state.comment} className="mdl-textfield__input" type="text" id="sample3" placeholder="Enter a Comment..." />
              </div>
              <div className="flexDisplay flex1">
                <button ref="button1" className="mdl-button mdl-js-button mdl-button--icon">
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
           {this.props.loading ? <p>Loading Comments</p> : <ul className="mdl-list list"> {this.renderList()} </ul>}
            <div className="mdl-card__menu__left">
              <button ref="button2" className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                <i className="material-icons">arrow_back</i>
              </button>
            </div>
          </div>
          : <p> Loading </p>}
      </div>
    );
  }
}

CommentsPage.propTypes = {
  loading: React.PropTypes.bool,
  post: React.PropTypes.object,
  comments: React.PropTypes.array,
};

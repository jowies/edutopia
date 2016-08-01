import React from 'react';
import { upgrade, downgrade } from '../../helpers/upgrade.jsx';
import EnterLectureCard from '../homepage/cards/enterlecturecard.jsx';

import EntryCard from '../homepage/cards/entrycard.jsx';
import SignUpCard from '../homepage/cards/signupcard.jsx';
import LogInCard from '../homepage/cards/logincard.jsx';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeCard: 'entrycard' };
    this.getCardContent = this.getCardContent.bind(this);
    this.showSignUpCard = this.showSignUpCard.bind(this);
    this.showLogInCard = this.showLogInCard.bind(this);
    this.showEntryCard = this.showEntryCard.bind(this);
    this.showEnterLectureCard = this.showEnterLectureCard.bind(this);
  }
  componentDidMount() {
    // upgrade(this.refs.signup, this.refs.login, this.refs.card);
  }

  componentDidUpdate() {
   // upgrade(this.refs.signup, this.refs.login, this.refs.card);
  }

  componentWillUnmount() {
   // downgrade(this.refs.signup, this.refs.login, this.refs.card);
  }
  getCardContent() {
    if (this.state.activeCard === 'entrycard') {
      return (
        <EntryCard
          showSignUpCard={this.showSignUpCard}
          showLogInCard={this.showLogInCard}
          showEnterLectureCard={this.showEnterLectureCard}
        />);
    }
    if (this.state.activeCard === 'logincard') {
      return <LogInCard goBack={this.showEntryCard} />;
    }
    if (this.state.activeCard === 'signupcard') {
      return <SignUpCard goBack={this.showEntryCard} />;
    }
    if (this.state.activeCard === 'enterlecturecard') {
      return <EnterLectureCard goBack={this.showEntryCard} />;
    }
    return <div>Page not found - go back</div>;
  }
  showEnterLectureCard() {
    this.setState({
      activeCard: 'enterlecturecard',
    });
  }
  showEntryCard() {
    this.setState({
      activeCard: 'entrycard',
    });
  }
  showLogInCard() {
    this.setState({
      activeCard: 'logincard',
    });
  }
  showSignUpCard() {
    this.setState({
      activeCard: 'signupcard',
    });
  }

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col">
        </div>
        <div className="mdl-cell mdl-cell--4-col">
          {this.getCardContent()}
        </div>
        <div className="mdl-cell mdl-cell--4-col">
        </div>
      </div>
    );
  }
}

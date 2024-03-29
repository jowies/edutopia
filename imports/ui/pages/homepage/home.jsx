import React from 'react';
import { Meteor } from 'meteor/meteor';
import EnterLectureCard from '../homepage/cards/enterlecturecard.jsx';
import EntryCard from '../homepage/cards/entrycard.jsx';
import SignUpCard from '../homepage/cards/signupcard.jsx';
import LogInCard from '../homepage/cards/logincard.jsx';
import QuickGo from './cards/quickgo.jsx';

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
  getCardContent() {
    if (Meteor.userId()) {
      return <QuickGo goBack={this.showEntryCard} />;
    }
    if (this.state.activeCard === 'entrycard') {
      return (
        <EntryCard
          showSignUpCard={this.showSignUpCard}
          showLogInCard={this.showLogInCard}
          showEnterLectureCard={this.showEnterLectureCard}
        />);
    } else if (this.state.activeCard === 'logincard') {
      return <LogInCard goBack={this.showEntryCard} />;
    } else if (this.state.activeCard === 'signupcard') {
      return <SignUpCard goBack={this.showEntryCard} />;
    } else if (this.state.activeCard === 'enterlecturecard') {
      return <EnterLectureCard goBack={this.showEntryCard} />;
    }
    return <div>404 - Page not found - go back</div>;
  }

  getQuickGo() {
    return <QuickGo />;
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
        <div className="mdl-cell mdl-cell--12-col">
         {this.getCardContent()}
        </div>
      </div>
    );
  }
}

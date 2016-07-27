import React from 'react';
import Button from '../../components/button.jsx';
import upgrade from '../../helpers/upgrade.jsx';

export default class MyRooms extends React.Component {
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
      upgrade(this.refs.sppinner);
    }
  }

  renderList() {
    return this.props.rooms.map((room) => (
      <div>
        <p key={room._id}>{room.nickname}</p>
        <Button />
      </div>
    ));
  }

  render() {
    return (
      <div>
      {this.props.loading ?
        <div
          className="mdl-spinner
          mdl-spinner--single-color mdl-js-spinner is-active"
        >
        </div> : this.renderList()}
      </div>
    );
  }
}

MyRooms.propTypes = {
  loading: React.PropTypes.bool,
  rooms: React.PropTypes.array,
};

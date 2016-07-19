import React from 'react';

const HomePage = ({ content }) => (
  <div>
    {content}
  </div>
);

HomePage.propTypes = {
  content: React.PropTypes.object,
};

export default HomePage;

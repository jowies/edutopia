import React from 'react';

export const HomePage = ({ content }) => (
  <div>
    {content}
  </div>
);

HomePage.propTypes = {
  content: React.PropTypes.object,
};

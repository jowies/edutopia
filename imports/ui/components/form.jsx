import React from 'react';

const Form = ({ onSubmit, children }) => (
  <form
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

Form.propTypes = {
  children: React.PropTypes.element,
  onSubmit: React.PropTypes.func,
};

export default Form;

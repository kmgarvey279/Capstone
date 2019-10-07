import React from 'react';
import './Error.css';
import * as soundsModule from '../../redux/modules/sounds';

class Error extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="error">
          <h1>WARNING: an unexpected error occured</h1>
          <ul>
              <li>Unable to transfer data to requested destination.</li>  
              <li>Connection attempt unsuccessful.</li>
              <li>Alternative destination triggered a forced redirect. Unable to override.</li>
              <li>Destination branch classification: Extreme Danger. Strongly advised to not connect under any circumstances.</li>
              <li>Attempting to return to previous branch...</li>
              <li>Rollback Attempt unsuccessful.</li>
              <li>Severing connection to network to prevent further corruption.</li>
              <li>Thank you for using Dimentional Something. We wish you the best of luck in your impending death.</li>
            </ul>
      </div>
    );
  }
}

export default Error;
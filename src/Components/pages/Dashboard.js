import React from "react";
import Logo from "../.././Logo.png";

const JobDetail = () => {
return(
    <div>
      <div className="custom-header">
          <div className="custom-logo">
            <img src={Logo} className="App-logo" alt="logo" width="30" height="30" />
            <h2 className="page-title">Dashboard</h2>
          </div>
      </div>
      <br></br>
      <p style={{marginLeft: '2%', paddingTop: '4px'}}>Welcome to Dashboard page.</p>
    </div>
);
}

export default JobDetail;
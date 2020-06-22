import React from "react";
import {Badge} from "reactstrap";


class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract
    };
  }

  render() {
    return(
      <div>
        <h1>
          <Badge color="secondary">Create your own auction</Badge>
        </h1>
        
      </div>
    );
  }
}
export default UploadPage;

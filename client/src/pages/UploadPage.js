import React from "react";
import ImageUploader from 'react-images-upload';
import "../css/style.css";
import useScript from "../utils/useScript";

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: this.props.web3,
      accounts: this.props.accounts,
      contract: this.props.contract,
      image: null
    };
  }

  onDrop = (picture) => {
    var url = URL.createObjectURL(picture[0]);
    console.log(url);
    this.setState({
      imageURL: url
    });
  }

  render() {
    return(
      <div>
        <div className='uploadpage-title'>
          <h1>Create Your Own Auction</h1>
        </div>
        <div>
          <ImageUploader
            withIcon={true}
            buttonText='choose image'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            singleImage={true}
          />
          <img src={this.state.imageURL} />
        </div>
      </div>
    );
  }
}
export default UploadPage;

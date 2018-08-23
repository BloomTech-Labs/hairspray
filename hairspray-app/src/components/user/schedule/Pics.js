import React, { Component } from "react";

class Pics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file1: "",
      file2: "",
      file3: "",
      imagePreviewUrl1: "",
      imagePreviewUrl2: "",
      imagePreviewUrl3: ""
    };
  }

  handleChange = event => {
    event.preventDefault();

    console.log("event.target", event.target);

    let reader = new FileReader();
    let file = event.target.files[0];
    let fileName = event.target.name;
    let imagePreviewUrl = "";

    if (fileName === "file1") {
      imagePreviewUrl = "imagePreviewUrl1";
    } else if (fileName === "file2") {
      imagePreviewUrl = "imagePreviewUrl2";
    } else {
      imagePreviewUrl = "imagePreviewUrl3";
    }

    reader.onloadend = () => {
      this.setState({
        [fileName]: file.name,
        [imagePreviewUrl]: reader.result
      });

      let image = {
        ...this.state,
        [fileName]: file.name,
        [imagePreviewUrl]: reader.result
      };
      this.props.cbFromParent(image);
    };
    reader.readAsDataURL(file);
    console.log("state", this.state);
  };

  render() {
    // console.log("this.state", this.state);

    let imagePreview1 = null;
    let imagePreview2 = null;
    let imagePreview3 = null;

    if (this.state.imagePreviewUrl1) {
      imagePreview1 = (
        <img style={imageSize} src={this.state.imagePreviewUrl1} />
      );
    } else {
      imagePreview1 = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    if (this.state.imagePreviewUrl2) {
      imagePreview2 = (
        <img style={imageSize} src={this.state.imagePreviewUrl2} />
      );
    } else {
      imagePreview2 = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    if (this.state.imagePreviewUrl3) {
      imagePreview3 = (
        <img style={imageSize} src={this.state.imagePreviewUrl3} />
      );
    } else {
      imagePreview3 = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div style={picsContainer}>
        <div>Add 3 URL links to photos of example hairstyles. (Optional)</div>
        <form>
          <label>
            Pic1:
            <input
              name="file1"
              type="file"
              value={this.state.pic1}
              onChange={e => this.handleChange(e)}
            />
            <div>{imagePreview1}</div>
          </label>
          <label>
            Pic2:
            <input
              name="file2"
              type="file"
              value={this.state.pic2}
              onChange={e => this.handleChange(e)}
            />
            <div>{imagePreview2}</div>
          </label>
          <label>
            Pic3:
            <input
              name="file3"
              type="file"
              value={this.state.pic3}
              onChange={e => this.handleChange(e)}
            />
            <div style={picsContainer}>{imagePreview3}</div>
          </label>
        </form>
      </div>
    );
  }
}

const picsContainer = {
  width: "300px",
  height: "400px"
};

const imageSize = {
  maxHeight: "400px",
  maxWidth: "300px"
};

export default Pics;

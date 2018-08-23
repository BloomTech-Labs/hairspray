import React, { Component } from "react";
import { Card, CardTitle, CardText, Input } from "reactstrap";

class ExampleImages extends Component {
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

  getPreview = imagePreviewUrl => {
    if (imagePreviewUrl) {
      return <img className="example__images" src={imagePreviewUrl} />;
    } else {
      return (
        <CardText className="previewText">
          Please select an Image for Preview
        </CardText>
      );
    }
  };

  render() {
    // console.log("this.state", this.state);

    let imagePreview1 = this.getPreview(this.state.imagePreviewUrl1);
    let imagePreview2 = this.getPreview(this.state.imagePreviewUrl2);
    let imagePreview3 = this.getPreview(this.state.imagePreviewUrl3);

    return (
      <div>
        <div>(Optional) Upload 3 example hairstyle images.</div>
        <div className="example__images__form-container">
          <Card>
            <CardTitle>Image 1</CardTitle>
            <Input
              name="file1"
              type="file"
              value={this.state.pic1}
              onChange={e => this.handleChange(e)}
            />
            <div className="example__images-container">
              <div className="example__images">{imagePreview1}</div>
            </div>
          </Card>
          <Card>
            <CardTitle>Image 2</CardTitle>
            <Input
              name="file2"
              type="file"
              value={this.state.pic2}
              onChange={e => this.handleChange(e)}
            />
            <div className="example__images-container">
              <div className="example__images">{imagePreview2}</div>
            </div>
          </Card>
          <Card>
            <CardTitle>Image 3</CardTitle>
            <Input
              name="file3"
              type="file"
              value={this.state.pic3}
              onChange={e => this.handleChange(e)}
            />
            <div className="example__images-container">
              <div className="example__images">{imagePreview3}</div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default ExampleImages;

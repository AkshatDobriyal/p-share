import React, { Component, useState } from 'react';
import { ReactDOM } from 'react';
import Identicon from 'identicon.js';
import './LandingPage.scss';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

const Input = styled('input')({
  display: 'none',
});

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: ""
    };
  }

  setDescription = event => {
    this.setState({
      description: event.target.value
    });
  };

  render() {
  return (
      /*<div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Share Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Image description..."
                        required />
                  </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              <p>&nbsp;</p>
              { this.props.images.map((image, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>
                        <p>{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
      */
    <div className="landingPage">
      <form className="landingPage__form"onSubmit={(event) => {
          event.preventDefault()
          //const description = this.imageDescription.value
          this.props.uploadImage(this.state.description)
      }} >
        <h3 className="landingPage__form__head">Share Image</h3>

        <div className="landingPage__form__elem">

          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={this.props.captureFile}/>
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" onChange={this.props.captureFile}/>
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <br/>
        <div className="landingPage__form__elem">
          <TextField
            sx={{ m: 1, width: '40ch' }}
            label="Caption"
            id="imageDescription"
            helperText="Please Enter Image Description"
            color="warning"
            type="text"
            //ref={(input) => { this.imageDescription = input }}
            //onChange={(e) => { this.imageDescription = e.target.value}}
            onChange={this.setDescription}
            value={this.state.description}
            className="landingPage__form__elem__desc"
            placeholder="Image Description"
            required />
        </div>
        <br/>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </form>

      <br/>
      {this.props.images.map((image, key) => {
        return (
          <div className="landingPage__card" key={key} >
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader className="landingPage__card__header"
                avatar={
                  <img
                    className='mr-2'
                    width='30'
                    height='30'
                    src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                  />
                }
                
                title={image.author}
                //subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image={`https://ipfs.infura.io/ipfs/${image.imageHash}`}
                alt="image"
              />
              <CardContent>
                <Typography variant="body2" color="#2B364B">
                  <div className="landingPage__card__text">
                    {image.description}
                  </div>
                </Typography>
              </CardContent>
            </Card>
            <br/>
          </div>
        )
      })}
      </div>
    );
  }
}

export default LandingPage;
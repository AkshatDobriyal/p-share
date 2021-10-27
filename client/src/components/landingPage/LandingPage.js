// AKSHAT DOBRIYAL

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
import Web3 from 'web3';

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
    <div className="landingPage">
      <form className="landingPage__form"onSubmit={(event) => {
          event.preventDefault()
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
            <Card sx={{ maxWidth: 'fit-content' }}>
              <CardHeader className="landingPage__card__header"
                avatar={
                    <img
                      className="landingPage__card__header__photo"
                      width='25'
                      height='25'
                      src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                    />
                }
                
                title={
                    <div>
                      <p className="landingPage__card__header__address"> {image.author}</p>
                      <br/>
                    </div>
                }
                subheader={
                  <small className="landingPage__card__header__tip">
                    TIPS: {Web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                  </small>
                }
              />
              <CardMedia
                component="img"
                maxHeight="500"
                image={`https://ipfs.infura.io/ipfs/${image.imageHash}`}
                alt="image"
              />
              <CardContent>
                <Typography variant="body2" color="#2B364B">
                  <div className="landingPage__card__text">
                    <div className="landingPage__card__text__desc">
                      {image.description}
                    </div>
                    <br/>
                    <Button
                      variant="contained" endIcon={<SendIcon />}
                      name={image.id}
                      onClick={(event) => {
                        let tipAmount = Web3.utils.toWei('0.1', 'Ether')
                        console.log(event.target.name, tipAmount)
                        this.props.tipImageOwner(event.target.name, tipAmount)
                      }}
                    >
                      TIP 0.1 ETH
                    </Button>
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
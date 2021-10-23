import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './LandingPage.scss';
//import Input from '@material-ui/core/Input';
//import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import PhotoCamera from '@material-ui/core/PhotoCamera';
//import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
//import TextField from '@material-ui/core/TextField';
//import SendIcon from '@material-ui/core/SendIcon';
//import SendIcon from '@mui/icons-material/Send';

import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});

class LandingPage extends Component {

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
      <Stack direction="row" alignItems="center" spacing={2}>
        <form className="landingPage__form" 
          onSubmit={(event) => {
            event.preventDefault()
            const description = this.imageDescription.value
            this.props.uploadImage(description)
        }}>
          <div className="landingPage__form__elem">
            <h3 className="landingPage__form__elem__head" >Share Image</h3>
          </div>
          <div className="landingPage__form__elem">
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={this.props.captureFile} />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <br/>            

          <TextField id=" imageDescription" label="Caption" variant="outlined" ref={(input) => { this.imageDescription = input }} required />
          <br/>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </form>
      </Stack>


      <p>&nbsp;</p>
      {this.props.images.map((image, key) => {
        return (
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
                <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px' }} /></p>
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
    );
  }
}

export default LandingPage;
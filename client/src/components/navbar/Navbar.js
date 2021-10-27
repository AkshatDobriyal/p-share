// AKSHAT DOBRIYAL

import React, { Component } from 'react';
import Identicon from 'identicon.js';
import './Navbar.scss';
//import photo from './profilePhoto1.jpeg'

class Navbar extends Component {

  render() {
    return (
      <div className="nav">
          <div className="nav__header" >
              <div className="nav__header__logo">
                <a href="https://github.com/AkshatDobriyal">
                  <p><span style={{fontWeight:`600`}}>P</span>Share</p>
                </a>
              </div>
              <ul className="nav__header__list">
                  <li className="nav__header__list__element">
                    <button className="nav__header__list__element__login">{this.props.account}</button>  
                  </li>
                  <li className="nav__header__list__element">
                    { this.props.account
                      ? <img
                        className="nav__header__list__element__photo"
                        src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                      />
                      : <span></span>
                    }  
                  </li>
              </ul>
          </div>
      </div>
    );
  }
}

export default Navbar;
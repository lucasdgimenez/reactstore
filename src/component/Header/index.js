import React from "react";
import "./styles.scss"
import Logo from "./../../assets/logo.png"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {auth} from "./../../firebase/utils"

const Header = props => {
  const { currentUser } = props;
  return (
    <header className="header">
      <div className="wrap">
        <Link to="/" className="logo">
          <img src={Logo} alt="SimpleTut LOGO"/>
        </Link>

        <div className="callToActions">

          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">
                  My account
                </Link>
              </li>
              <li>
                <span onClick={() => auth.signOut()}>
                  LogOut
                </span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">
                  Registe
                </Link>
              </li>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
          
        </div>
      </div>
    </header>
  )
}

Header.defaultProps = {
  currentUser: null
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header)
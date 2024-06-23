import React from 'react'
import classes from '../Header/header.module.css'
import evalogo from '../../img/Evan-logo.png'
import { Link } from 'react-router-dom'
const Header = () => {

  function logout(){
    // const token = localStorage.getItem("token")
    localStorage.clear()
  }
  return (

    <section className={classes.Header}>
        <div className={classes.Header__container}>
          <div className={classes.logo__container}>
            <a href=''>
              <img src={evalogo} alt='logo'/>
            </a>
          </div>
          <div className={classes.links}>
            <div className={classes.link__containers}>
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to='#'>How it Works</Link>
                </li>
              </ul>
            </div>
            <Link to="/Login">
              <button onClick={logout}>Logout</button>
            </Link>            
          </div>

        </div>
    </section>
  )
}

export default Header
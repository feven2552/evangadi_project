import React from 'react'
import classes from '../Footer/Footer.module.css'
import footerlogo from '../../img/evangadi-logo-white.png'
import { LuFacebook } from "react-icons/lu";
import { LuInstagram } from "react-icons/lu";
import { AiOutlineYoutube } from "react-icons/ai";
const Footer = () => {
  return (
    <section className={classes.Footer__outer_container}>  
    <div className={classes.Footer__inner_container}>
      <div className={classes.inner__container_logo}>
        {/* logo */}
        <a href='#'>
          <img src={footerlogo}/>
        </a>
        {/* social Media */}
        <div className={classes.icons}>
            <LuFacebook />
            <LuInstagram />
            <AiOutlineYoutube />
        </div>       
      </div>
      <div className={classes.inner__container_link}>
        <h3>Useful Link</h3>
        <ul>
          <li>
            <a href='#'>How it works</a>
            <a href='#'>Terms of Service</a>
            <a href='#'>Privacy policy</a>
          </li>
        </ul>
      </div>
      <div className={classes.inner__container_contactinfo}>
        <h3>Contact Info</h3>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </div>    
        
    </section>
  )
}

export default Footer
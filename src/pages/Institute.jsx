import React from 'react'
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Institutefeatures from '../components/Institutefeatures'
import Layout from '../components/Layout';
export default function Home() {
  return (
    <>
      {/* <Layout> */}
        <div className="dup-body">
          <div className='dup-body-wrap'>
            <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
            <a href='https://wa.me/919778399433?text=Hello%20SavvyPool,%20We%20would%20like%20to%20list%20our%20institute%20in%20your%20webportal'>
              <div className='whatsapp-widget' title='Send us a message'>
                <img src='img/whatsapp-logo.png' alt='whatsapp'></img>
                <p>List Now - For Free!</p>
              </div>
            </a>
            <div className='institute-listnow'>
              <div className='institute-text'>
                <h1>Showcase your courses by inputting credentials here. Simplifying course listing, seamless course management and promotion.</h1>
              </div>
              <div className='institute-form'>
                <form action="https://formsubmit.co/136b8cee9c18ce0f1e75cbf90656f73b " method="POST">
                  <input type="hidden" name="_template" value="table"></input>
                  <input type="name" name="Name" required placeholder="Institute name"></input>
                  <input type="email" name="Email" required placeholder="Enter e-mail address"></input>
                  <input type="tel" name="Phone number" placeholder="Phone Number" pattern="[0-9]{10}"></input>
                  <input type="name" name="Contact Person" required placeholder="Contact person name"></input>
                  <input type="name" name="Position" required placeholder="Position"></input>
                  <input type="hidden" name="_captcha" value="false"></input>
                  <div class="btn-group">
                    <button type="submit" className="button">List Now - For Free!</button>
                  </div>
                </form>
              </div>
            </div>
            <Institutefeatures />
            <Contact />
          </div>
        </div>
      {/* </Layout> */}
    </>
  )
}

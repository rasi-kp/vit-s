import React from 'react'
import Banner from '../components/Banner';
import Card from '../components/Card';
import Contact from '../components/Contact';
import Features from '../components/Features';
import Navbar from '../components/Navbar';
import Testimonial from '../components/Testimonial';
// import Layout from '../components/Layout';
export default function Home() {
  return (
    <>
      {/* <Layout> */}
        <div className="dup-body">
          <div className='dup-body-wrap'>
            <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
            <hr className='hr'></hr>
            <Banner />
            <Card />
            <Features />
            <Testimonial />
            <Contact />
          </div>
        </div>
      {/* </Layout> */}
    </>
  )
}

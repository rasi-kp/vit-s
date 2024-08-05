import React from 'react'
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import DataCard from '../components/DataCard';
export default function Courses() {
  return (
    <>
      <div className="dup-body">
        <div className='dup-body-wrap'>
          <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
          <div className='Course-body'>
            <div>
              <DataCard />
            </div>
            
          </div>
          <Contact />
        </div>
      </div>
    </>
  )
}

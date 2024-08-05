import React from 'react';
import { Link } from 'react-router-dom';

export default function AddInstitute() {
  return (
    <div className='addinstitute-container'>
      <button>
        <Link to = {{pathname : '/admin'}}>
          <img src='../img/back-arrow.png' alt='back-arrow' className='back-arrow' />
        </Link>
      </button>
      <section>
        <h1 className='section-title'>Add Institute</h1>
        <p className='section-title-p'>Institute Profile</p>
        <div className='add-institute-form'>
          <form className='forms'>
            <div>
              <h1 className='starlabel'>Institute name</h1>
              <input type='text' placeholder='Institute name' />
            </div>
            <div>
              <h1>About us</h1>
              <input placeholder='About the institute'></input>
            </div>
            <div>
              <h1 className='starlabel'>Website</h1>

              <input type='text' placeholder='Eg :  https://institution.com/' important />
            </div>
            <div>
              <h1 className='starlabel'>
                Add New Location
              </h1>
              <div className='select'>
                <select>
                  <option value='India'>India</option>
                  <option value='USA'>USA</option>
                </select>
                <select>
                  <option value='Kerala'>Kerala</option>
                  <option value='Karnataka'>Karnataka</option>
                </select>
                <select>
                  <option value='Kannur'>Kannur</option>
                  <option value='Bangalore'>Bangalore</option>
                </select>
              </div>
              <button className='add-btn'><img src='../img/add-icon.png' alt='add-icon' className='add-icon'></img>Add Location</button>
            </div>
            <div>
              <h1>Contact Email</h1>
              <input type='email' placeholder='example@example.com' />
            </div>
            <div>
              <h1>Contact Number</h1>
              <input type='tel' placeholder='Contact number' />
            </div>
            <button type='submit' className='submit' style={{ alignSelf: 'flex-end' }}>Submit</button>
          </form>
          {/* <div className='upload'>
            <div className='upload-container'>
              <button className='add-btn'><img src='../img/add-icon.png' alt='add-icon' style={{width : '40px'}}></img></button>
              <button className='upload-btn'>Upload your logo</button>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

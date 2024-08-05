import React, { useState } from 'react';
import '../App.css'; // Assuming the CSS file is in the same directory as your component
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
const Navbar = (props) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(prevMenuActive => !prevMenuActive);
  };

  const closeModal = () => {
    document.getElementById('modal-btn').checked = false;
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <header className="navbarContainer">
      <div className="navLogo">
        <Link to="/">{props.title}</Link>
      </div>
      <Link to="/search">
        <img src="../img/Search.svg" id="search-mobile-only" alt="search" />
      </Link>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div className={`navMenu ${menuActive ? 'active' : ''}`} id="navMenu">
        <div className="navItemHidden">
          <div className="navHidden">
          <SearchBar placeholder="Explore suitable courses..." />
          </div>
        </div>
        <div className="navItem">
          <div className="navLink">
            <Link to="/">
              <p className="nav-p">{props.nav1}</p>
            </Link>
          </div>
        </div>
        <div className="navItem">
          <div className="navLink">
            <Link to={{ pathname: "/institute" }}>
              <p className="nav-p">{props.nav2}</p>
            </Link>
          </div>
        </div>
        <div className="navItem">
          <div className="navLink">
            <input type="checkbox" id="modal-btn" className="modal-btn" name="modal-btn" />
            <label><Link to="/admin">Admin Login</Link></label>
            {/* <label htmlFor="modal-btn">Join Us<i className="uil uil-expand-arrows"></i></label> */}
            <div className="modal" onClick={() => closeModal()}>
              <div className="modal-wrap" style={{ position: 'relative' }} onClick={(event) => handleClick(event)}>
                <span onClick={() => closeModal()} style={{ position: 'absolute', top: 10, right: -15, cursor: 'pointer' }} aria-hidden="true">
                  <img src="img/x.png" alt="modal-close"  className='close_button'/>
                </span>
                <div className="modal-data">
                  <div className="modal-content">
                    <h3>We are thrilled to share that Savvypool has officially launched its Course Directory App</h3>
                    <img src="img/star.png" alt="" className="star" />
                    <Link to="https://play.google.com/store/apps/details?id=com.savvypool.savvypool" target="_blank" rel="noreferrer">
                      <button className="button">
                        <h6>Get it on playstore </h6>
                        <img src="img/Arrow.svg" className="arrow" alt="close-arrow" />
                      </button>
                    </Link>
                  </div>
                  <img src="img/image-a.jpg" className="modal-image" alt="savvypool-poster" />
                </div>
                <div className="qrcode">
                  <img src="img/qr.png" alt="qrcode" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

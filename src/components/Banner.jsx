import React from 'react';
import styled, { css } from 'styled-components'
// import VideoComponent from './VideoComponent';
import { Link } from 'react-router-dom';
const BannerH1 = styled.h1`
  font-size: 30px;
  font-weight: 700; 
  margin-bottom: 0px;
  margin-right: -4px;
  line-height: 55px;
  @media (max-width: 600px) {
    font-size: 25px;
    line-height: 50px;
    padding: 0px 10px;
  }
`;
const BannerP = styled.p`
font-size: 30px;
// font-weight: 700; 
margin-bottom: 0px;
margin-right: -4px;
line-height: 55px;
@media (max-width: 600px) {
  font-size: 25px;
  padding: 0px 10px;
}
`
const buttonStyles = css`
  line-height: 42px;
  border-radius: 10px;
  color: #222222;
  display: inline-block;
  font-weight: 500;
  position: relative;
  border: 1px solid rgba(255, 201, 0, 0.8);
  background: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
  padding: 0px 20px;
  box-shadow: 4px 4px 0 #000000;

  &:focus {
    outline: none;
  }

  span {
    color: #222222;
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    right: 15px;
    transition: all 0.3s ease 0s;
    transform: translate(-50%, -50%);
  }

  &:hover {
    background: #ffc947;
    color: #fff;
    transform: translateX(4px) translateY(4px);

    span {
      color: #fff;
      right: 20px;
    }
  }

  &.white {
    border: 1px solid #fff;
    color: #fff;

    span {
      color: #fff;
    }

    &:hover {
      background: #fff;
      color: #e0003b;

      span {
        color: #e0003b;
      }
    }
  }
`;

export const PrimaryButton1 = styled.button`
  ${buttonStyles}

  @media (max-width: 600px) {
    padding: 4px;
    display: flex;
    justify-content: space-around;
    width: 150px;
    margin-bottom: 10px;
  }
`;

export const PrimaryButton = styled.button`
  ${buttonStyles}
`;
function Banner() {
  return (
    <>
      <section className='banner-area relative'>
        <div className="container">
          <div className="rows">
            <div className="banner-content">
              <div className="contents">
                <BannerH1>
                  Explore countless courses <br></br>from handpicked e-learning and offline institutions all in one place!
                </BannerH1>
                <br />
                <BannerP className='banner-p'>
                  Unlock your potential
                </BannerP>
                <br />
                <Link to="/search">
                  <div className='button-div'>
                    <button className='button'>
                    Explore Courses
                  </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="contents">
              <div><img src='/img/web_image.png' className='web-image' alt='webimage'></img></div>   
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;

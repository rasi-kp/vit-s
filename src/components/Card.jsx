import React from 'react';
import { Link } from 'react-router-dom';
import { useCardData } from './CourseDataContext';

export default function Card() {
  const { cardData } = useCardData(); // Get the cardData from the context

  // Initialize counters for web-dev and dig-mar courses
  let webDevCourseCount = 0;
  let digMarCourseCount = 0;
  let graDesCourseCount = 0;
  let cmaCourseCount = 0;
  let accCourseCount = 0;
  // let webDesCourseCount = 0;
  let intDesCourseCount = 0;
  let animationCourseCount = 0;
  let uiCourseCount = 0;
  let travelCourseCount = 0;
  // Use a switch statement to categorize the courses
  cardData.forEach(course => {
    switch (course.CourseShortName) {
      case 'web-dev':
        webDevCourseCount++;
        break;
      case 'dig-mar':
        digMarCourseCount++;
        break;
      case 'gra-des':
        graDesCourseCount++;
        break;
      case 'cma':
        cmaCourseCount++;
        break;
      case 'acc':
        accCourseCount++;
        break;
      // case 'web-des':
      //   webDesCourseCount++;
      //   break;
      case 'int-des':
        intDesCourseCount++;
        break;
      case 'animation':
        animationCourseCount++;
        break;
      case 'ui':
        uiCourseCount++;
        break;
      case 'travel':
        travelCourseCount++;
        break;
      // Add additional cases for other course types if needed
      default:
        break;
    }
  });

  return (
    <>
      <section className='product'>
        <h1 className='product-category'>Popular categories</h1>
        <div className='product-container'>
        <div className="product-card">
            <Link to="/shortcourse/dig-mar">
              <div className="product-image">
                <span className="discount-tag">{digMarCourseCount} courses</span>
                <img src="/img/card_1_dig.png" className="product-thumb" alt=""></img>
              </div>
            </Link>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/animation">
                <span className="discount-tag">{animationCourseCount} courses</span>
                <img src="/img/card_12_ani.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/travel">
                <span className="discount-tag">{travelCourseCount} courses</span>
                <img src="/img/card_8_gam.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/web-dev">
                <span className="discount-tag">{webDevCourseCount} courses</span>
                <img src="/img/card_3_webdev.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/int-des">
                <span className="discount-tag">{intDesCourseCount} courses</span>
                <img src="/img/card_7_int.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/ui">
                <span className="discount-tag">{uiCourseCount} courses</span>
                <img src="/img/card_5_ui.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/cma">
                <span className="discount-tag">{cmaCourseCount} courses</span>
                <img src="/img/card_10_cma.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/acc">
                <span className="discount-tag">{accCourseCount} courses</span>
                <img src="/img/card_13_acc.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/gra-des">
                <span className="discount-tag">{graDesCourseCount} courses</span>
                <img src="/img/card_4_gra.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          {/* <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/web-des">
                <span className="discount-tag">{webDesCourseCount} courses</span>
                <img src="/img/card_2_webdes.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div> */}
          {/* <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/acc">
                <span className="discount-tag">{accCourseCount} courses</span>
                <img src="/img/card_10_cma.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/acc">
                <span className="discount-tag">{accCourseCount} courses</span>
                <img src="/img/card_10_cma.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div>
          <div className="product-card">
            <div className="product-image">
              <Link to="/shortcourse/acc">
                <span className="discount-tag">{accCourseCount} courses</span>
                <img src="/img/card_10_cma.png" className="product-thumb" alt=""></img>
              </Link>
            </div>
          </div> */}
        </div>
      </section>
    </>
  )
}
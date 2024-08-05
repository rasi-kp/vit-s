import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
export default function Cards({
  InstitutionName,
  InstitutionImage,
  CourseName,
  CourseDescription,
  CourseFee,
  CourseDurationy,
  CourseDurationm,
  CourseId
}) {
  const navigate = useNavigate(); // Use the hook to get the navigate function

  const navigateToCourseDetails = () => {
    navigate(`/shortcourse/course-details/${CourseId}`,{state:{course_id:CourseId}}); // Correct way to navigate
  };
  return (
    <>
      <div className='dynamic-cards' onClick={navigateToCourseDetails}>
        <div className='card-institute'>
          <div className='institute-card-title'>
            <img src="/logo.png" className='institute-logo' alt='institute-logo'></img>
            <h1>{InstitutionName}</h1>
          </div>
          <div className='Arrow-div'>
            <img src='/img/Arrow.svg' alt='close'></img>
          </div>
        </div>
        <hr className='card-hr'></hr>
        <div className='card-category'>
          {/* <p className='card-p'>{CourseShortName}</p> */}
          <h1 className='card-title'>{CourseName}</h1>
          <p className='card-desc'>{CourseDescription}</p>
        </div>
        {/* <hr className='card-hr'></hr> */}
        <div className='card-footer'>
          <div className='course-fee'>
            <h1 className='footer-title'>Course Fee</h1>
            {CourseFee ? (<p>{"Rs. " + CourseFee + " /-"}</p>) : (<p>null</p>)}
          </div>
          <div className='vl'></div>
          <div className='course-duration'>
            <h1 className='footer-title'>Course Duration</h1>
            <p>{CourseDurationy && CourseDurationy + ' year'} {CourseDurationy && CourseDurationm ? ("and ") : ''}{CourseDurationm && CourseDurationm + ' Months'} </p>
          </div>
        </div>
      </div>

    </>
  )
}
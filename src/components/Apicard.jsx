import React from 'react';

export default function Apicard({
  Institutionname,
  UniversityLogo,
  Coursedescription,
  CourseName,
  CourseFee,
  CourseFeeType,
  CourseDurationy,
  CourseDurationm,
  CourseId,
  logo,
  city,
  state,
  country
}) {
  return (
    <>
      <div className='dynamic-cards'>
        <div className='card-institute'>
          <div className='institute-card-title'>
            <img src={UniversityLogo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0TjgyleSleE--QAot645MczvnQ_Wtn2gK81wHakbZUqVbgYHT6w_xtTYs-uFzagDd-w&usqp=CAU'} className='institute-logo' alt='institute-logo'></img>
            <h1 >{Institutionname||""}</h1>
          </div>
          <div className='Arrow-div'>
            <img src='/img/Arrow.svg' alt='close'></img>
          </div>
        </div>
        <hr className='card-hr'></hr>
        <div className='card-category'>
          <h1 className='card-title'>{CourseName || ''}</h1>
          {/* <p className='card-desc'>{CourseId}</p> */}
        </div>
        <div className='card-footer'>
          <div className='course-fee'>
            <h1 className='footer-title'>Course Fee</h1>
            <p>{CourseFee || '-'}</p>
          </div>
          <div className='vl'></div>
          <div className='course-duration'>
            <h1 className='footer-title'>Course Duration</h1>
            <p>{(CourseDurationy!='')? CourseDurationy+' Year':''}  {(CourseDurationm!='')? CourseDurationm+' Month':''} </p>
          </div>
        </div>
      </div>
    </>
  )
}

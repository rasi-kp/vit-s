import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import logo from '../logo.svg'
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { useCardData } from '../components/CourseDataContext';
import { getcoursebyid } from '../services/CommonApi';

export default function CoursesDetails() {

  const location = useLocation();
  const { course_id } = location.state || '';
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [data,setdata]=useState('')

  const fetch=async () => {
    const result=await getcoursebyid(course_id)
    console.log(result);
    setdata(result)
  }


  useEffect(() => {
    setIsLoaded(true);
    fetch()
  }, []);

  // if (!data) {
  //   return (
  //     <div className='dup-body'>
  //       <div className='dup-body-wrap'>
  //         <div className='course-none'>
  //           <img src='/img/error.svg' alt='error svg'></img>
  //           <p>The course you were looking for</p>
  //           <h1>Was not found.</h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className={`dup-body ${isLoaded ? 'loaded' : ''}`}>
        <div className='dup-body-wrap'>
          <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
          <motion.div
            style={{ marginBottom: '1rem' }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='Full-details'>
              <div className='sponsored-content'>
                <h1>Sponsored Content</h1>
              </div>
              <div className='inst-detail'>
                <div className='Institute-details'>
                  <img src='https://images.pexels.com/photos/2973323/pexels-photo-2973323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='insititute-banner' alt=''></img>
                  <img src={logo} className='Institute-details-image-2' alt='instituteimg' />
                  <div className='Institute-address-none'>
                    <div className='institute-website-redirect'>
                      <h1 onClick={() => {
                        switch (data.institution_id) {
                          default:
                            navigate(`/shortcourse/course-details/institute/${data.institution_id}`);
                            break;
                        }
                      }}>{data.institution_name}</h1>
                    </div>
                    <p>{data.city}, {data.state}, {data.country}</p>
                  </div>
                </div>
                <h1 className='course-category'>{data.course_name}</h1>
                <div className='course-dur'>
                  <p>Course category</p>
                  <h2>{data.course_category}</h2>
                </div>
                <hr className='hr-tag'></hr>
                <div>
                  <p classname='p-category'>Course Name</p>
                  <h1>{data.course_name}</h1>
                  <hr className='hr-tag'></hr>
                </div>
                {/* <div>
                  <p classname='p-category'>Insititute</p>
                  <div className='web-link'>
                    <h1><a href={data.url}>{data.url}</a></h1>
                    <a href={data.website}><img src='/img/External.svg' className='redirect' alt='visit-website'></img></a>
                  </div>
                  <hr className='hr-tag'></hr>
                </div> */}
                <div>
                  <p classname='p-category'>Course Description</p>
                  <h1>{data.course_description}</h1>
                  <hr className='hr-tag'></hr>
                  <div className='course-dur'>
                    <p classname='p-category'>Mode Of Teaching</p>
                    <h2>{data.teaching_mode}</h2>
                  </div>
                  <hr className='hr-tag'></hr>
                  <div>
                    <l>
                      <p classname='p-category'>Course Details</p>
                      <h1>{data.course_curriculum}</h1>
                    </l>
                  </div>
                  <hr className='hr-tag'></hr>
                  <div className='course-dur'>
                    <p classname='p-category'>Course Duration</p>
                    
                  </div>
                  <div className='course-dur' style={{justifyContent:"space-evenly"}}>
                  <h2 classname='p-category' style={{padding:"5px 80px"}}>{data.course_duration_year && data.course_duration_year+" Year"}</h2>
                  {data.course_duration_month && data.course_duration_year ?(<h1>and</h1>):""}
                  {data.course_duration_month && <h2 style={{padding:"5px 80px"}} classname='p-category'>{data.course_duration_month && data.course_duration_month+" Months"}</h2>}
                  </div>
                  <hr className='hr-tag'></hr>
                  {/* <div className='course-dur'>
                    <p classname='p-category'>Intakes</p>
                    <h2>July</h2>
                  </div>
                  <hr className='hr-tag'></hr>
                 
                  <hr className='hr-tag'></hr> */}
                  <div className='course-dur'>
                    <p classname='p-category'>Course Fee</p>
                    {data.course_fee ? (<h2>{"Rs. " + data.course_fee + " /-"}</h2>) : (<p>null</p>)}
                  </div>
                  {/* <div className='course-dur'>
                    <p classname='p-category'>Course beginned on</p>
                    <h2>July 2018</h2>
                  </div>
                  <hr className='hr-tag'></hr>
                  <div>
                    <p classname='p-category'>Common Programs</p>
                    <h2>hai hello</h2>
                  </div>  */}
                  <hr className='hr-tag'></hr>
                  <div className='course-dur'>
                    <p classname='p-category'>Contact Info</p>
                    <h2>None</h2>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <Contact />
        </div>
      </div>
    </>
  );
}

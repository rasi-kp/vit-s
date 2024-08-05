import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';

const ApiCourseDetails = () => {
    const { courseId } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://ec2-65-0-21-186.ap-south-1.compute.amazonaws.com:9000/api/v1/university/course/${courseId}/profile`);
                console.log('API response:', response.data);
                setCourseDetails(response.data);
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchData();
    }, [courseId]);


    if (!courseDetails) {
        // You can render a loading indicator here if needed
        return (<div className='dup-body'>
            <div className='dup-body-wrap'>
                <div className='course-none'>
                    <p>Loading...</p>
                </div>
            </div>
        </div>);
    }

    return (
        <div className='dup-body-wrap'>
            <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
            <div className='Full-details'>
            <div className='sponsored-content'>
              <h1>Similar Institutes</h1>
              <div className='Similar-Institutes'>
                <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0TjgyleSleE--QAot645MczvnQ_Wtn2gK81wHakbZUqVbgYHT6w_xtTYs-uFzagDd-w&usqp=CAU' className='institute-logo' alt='institute-logo'></img>
                  <h2>University of Oxford</h2>
                </div>
                <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0TjgyleSleE--QAot645MczvnQ_Wtn2gK81wHakbZUqVbgYHT6w_xtTYs-uFzagDd-w&usqp=CAU' className='institute-logo' alt='institute-logo'></img>
                  <h2>University of Berlin</h2>
                </div>
                <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY0TjgyleSleE--QAot645MczvnQ_Wtn2gK81wHakbZUqVbgYHT6w_xtTYs-uFzagDd-w&usqp=CAU' className='institute-logo' alt='institute-logo'></img>
                  <h2>University of Charlton</h2>
                </div>
              </div>
            </div>
                <div className='inst-detail'>
                    <div className='Institute-details'>
                        {/* <img src='https://images.pexels.com/photos/2973323/pexels-photo-2973323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='insititute-banner' alt=''></img> */}
                        <img src={courseDetails.data.preview_image_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&usqp=CAU'} className='Institute-details-image' alt='instituteimg' />
                        <div className='Institute-address-none'>
                            <div className='institute-website-redirect'>
                                <h1
                                    onClick={() => {
                                        // console.log(courseDetails.data.university_user_id + " uni id")
                                        navigate(`/course/institute/${courseDetails.data.university_user_id}`);
                                    }}
                                >{courseDetails.data.university_name}</h1>
                            </div>
                            {/* <p>{courseDetails.data.City}, {courseDetails.data.State}, {courseDetails.data.Country}</p> */}
                        </div>
                    </div>
                    <h1 className='course-category'>{courseDetails.data.preview_title}</h1>
                    <div className='course-buttons'>
                        <button className='activeclass'>Overview</button>
                        <button className='nonactiveclass'>Preview</button>
                        <button className='nonactiveclass'>Mentors</button>
                    </div>
                    <div className='course-dur'>
                        <p>Course Category</p>
                        <h2>{courseDetails.data.course_category}</h2>
                    </div>
                    {/* <hr className='hr-tag'></hr> */}
                    <div className='course-dur'>
                        <p>Sub Category</p>
                        <h2>{courseDetails.data.preview_title}</h2>
                    </div>
                    <hr className='hr-tag'></hr>
                    <div>
                        <p classname='p-category'>Course Name</p>
                        <h1>{courseDetails.data.course_name}</h1>
                        <hr className='hr-tag'></hr>
                    </div>
                    {/* <div> */}
                        {/* <p classname='p-category'>Name of the Insititute</p> */}
                        {/* <div className='web-link'> */}
                            {/* <h1> */}
                                {/* <a href={courseDetails.data.Website}> */}
                                {/* {courseDetails.data.university_name} */}
                                {/* </a> */}
                            {/* </h1> */}
                            {/* <a href={courseDetails.data.Website}><img src='/img/External.svg' className='redirect' alt='visit-website'></img></a> */}
                        {/* </div> */}
                        {/* <hr className='hr-tag'></hr> */}
                    {/* </div> */}
                    <div>
                        <p classname='p-category'>Course Description</p>
                        <h1 style={{ overflowWrap: 'break-word' }}>{courseDetails.data.preview_description}</h1>
                        <hr className='hr-tag'></hr>
                        <div>
                            {/* {courseDetails.map((data, index) => (
                                <l key={index}>
                                    <li>{data.program_curriculum}</li>
                                </l>
                            ))} */}
                            <l>
                                <p classname='p-category'>Course Curriculum</p>
                                <l>{courseDetails.data.program_curriculum}</l>
                                {/* <li>{courseDetails.data.ProgramCurriculum.Program1Descprition}</li>
                                <l>{courseDetails.data.ProgramCurriculum.Program2}</l>
                                <li>{courseDetails.data.ProgramCurriculum.Program2Descprition}</li> */}
                            </l>
                        </div>
                        <hr className='hr-tag'></hr>
                        <div>
                            <p classname='p-category'>Course Fee</p>
                            <h2>{courseDetails.data.course_fee}</h2>
                            <div className='course-dur'>
                                <h2>{courseDetails.data.course_fee_type}</h2>
                            </div>
                            
                        </div>
                        <hr className='hr-tag'></hr>
                        <div>
                            <p classname='p-category'>Mode Of Teaching</p>
                            <div className='course-dur'>
                                <h2>{courseDetails.data.mode_of_teaching}</h2>
                            </div>
                        </div>
                        <hr className='hr-tag'></hr>
                        <div>
                            <p classname='p-category'>Course Duration</p>
                            <div className='course-dur'>
                                <h2>{courseDetails.data.course_duration_year} years</h2>
                            </div>  
                        </div>
                        <hr className='hr-tag'></hr>
                        <div>
                            <p classname='p-category'>Intakes</p>
                            <div className='course-dur'>
                                <h2>{courseDetails.data.intake}</h2>
                            </div>
                        </div>
                        <hr className='hr-tag'></hr>
                        {/* <div className='course-dur'>
                            <p classname='p-category'>Course beginned on</p>
                            <h2>{courseDetails.data}</h2>
                        </div>
                        <hr className='hr-tag'></hr> */}
                        <div>
                            <p classname='p-category'>Number of terms</p>
                            <div className='course-dur'>
                                <h2>{courseDetails.data.terms}</h2>
                            </div>
                        </div>
                        <hr className='hr-tag'></hr>
                        <l>
                            <p classname='p-category'>Eligibility</p>
                            <li>{courseDetails.data.Eligibility_criteria}</li>
                            <hr className='hr-tag'></hr>
                        </l>
                        <div>
                            <p classname='p-category'>Languages</p>
                            <h2>English,Malayalam</h2>
                        </div>
                        <hr className='hr-tag'></hr>
                        <div>
                            <p classname='p-category'>Common Programs</p>
                            <h2>{courseDetails.data.common_program || 'No data available'}</h2>
                        </div>
                        <hr className='hr-tag'></hr>
                        <div>
                            <p classname='p-category'>Application Timelines</p>
                            <l>
                                {courseDetails.data.application_timelines ? (
                                    courseDetails.data.application_timelines.map((timeline, index) => (
                                        <li key={index}>{timeline || 'No data available'}</li>
                                    ))
                                ) : (
                                    <li>No data available</li>
                                )}

                            </l>
                            {/* <h2>{courseDetails.data.application_timelines}</h2> */}
                        </div>
                        <hr className='hr-tag'></hr>
                        <l>
                            <p classname='p-category'>Available Scholarship</p>
                            {courseDetails.data.available_scholarship ? (
                                courseDetails.data.available_scholarship.map((scholarship, index) => (
                                    <li key={index}>{scholarship || 'No data available'}</li>
                                ))
                            ) : (
                                <li>No data available</li>
                            )}
                            <hr className='hr-tag'></hr>
                        </l>
                        <div>
                            <p classname='p-category'>Accomodations Facilities</p>
                            <h2>{courseDetails.data.accomodation || 'No data available'}</h2>
                            <hr className='hr-tag'></hr>
                            <p classname='p-category'>Recreations</p>
                            <l>
                                {courseDetails.data.recreations ? (
                                    courseDetails.data.recreations.map((recreations, index) => (
                                        <li key={index}>{recreations || 'No data available'}</li>
                                    ))
                                ) : (
                                    <li>No data available</li>
                                )}
                                {/* {courseDetails.data.recreations.map((recreations, index) => (
                                    <li key={index}>{recreations}</li>
                                ))} */}
                            </l>
                        </div>
                        <hr className='hr-tag'></hr>
                        <div className='course-dur'>
                            <p classname='p-category'>Contact Info</p>
                            <h2>None</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Contact />
        </div>
    );
};

export default ApiCourseDetails;

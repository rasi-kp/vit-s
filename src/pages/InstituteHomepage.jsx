import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Cards from '../components/Cards';
import { getinstitutionbyid } from '../services/CommonApi';
import { CircularProgress } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
export default function InstituteHomepage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { institute_id } = location.state || '';
    const [data, setdata] = useState('')
    const [isLoaded, setIsLoaded] = useState(false);
    const [courses, setcourses] = useState([])

    const fetch = async () => {
        const result = await getinstitutionbyid(institute_id)
        console.log(result);
        setdata(result)
        setcourses(result.courses)
    }

    useEffect(() => {
        setIsLoaded(true);
        fetch()
    }, []);

    // if (!data) {
    //     return (
    //         <div className='dup-body'>
    //             <div className='dup-body-wrap'>
    //                 <div className='course-none'>
    //                     <CircularProgress/>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    return (
        <>
            <div className="dup-body">
                <div className='dup-body-wrap'>
                    <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
                    <div className='Full-details'>
                        <div className='sponsored-content'>
                            <h1>Sponsored Content</h1>
                            {/* {filteredCards.map((cards, index) => {
                                if (cards.CourseShortName === selectedCard.CourseShortName) {
                                    if (index < 2) {
                                        return (
                                            <Cards
                                                key={index}
                                                InstitutionImage={cards.InstitutionImage}
                                                InstitutionName={cards.InstitutionName}
                                                CourseShortName={cards.CourseShortName}
                                                CourseName={cards.CourseName}
                                                CourseFee={cards.CourseFee}
                                                CourseDuration={cards.CourseDuration}
                                                CourseId={cards.CourseId}
                                                onClick={() => {
                                                    switch (cards.CourseId) {
                                                        default:
                                                            navigate(`/shortcourse/course-details/${cards.CourseId}`);
                                                            break;
                                                    }
                                                }}
                                            />
                                        );
                                    }
                                }
                                return null;
                            })} */}
                        </div>
                        <div className='inst-detail'>
                            <div className='Institute-details'>
                                <img src='https://images.pexels.com/photos/2973323/pexels-photo-2973323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='insititute-banner' alt=''></img>
                                <img src="/logo.png" className='Institute-details-image' alt='instituteimg' style={{ position: 'absolute' }} />
                                <div className='Institute-address'>
                                    <div className='institute-website-redirect'>
                                        <h3 style={{ cursor: 'default' }}>
                                            {data.university_name}
                                            <a href={"https://" + data.web_site} target="_blank" rel="noopener noreferrer">
                                                <LaunchIcon style={{ cursor: 'pointer', marginLeft: '8px' }} />
                                            </a>
                                        </h3>
                                    </div>
                                    <p>{data.city}, {data.state}, {data.country}</p>
                                </div>
                            </div>
                            <h1 className='provided-courses-h1' style={{ marginBottom: "5px" }}>About Us</h1>
                            <p style={{ paddingRight: '10px', paddingLeft: '20px', marginBottom: '5px' }}>{data.about_us}</p>
                            <h1 className='provided-courses-h1'>Courses</h1>
                            <div className='provided-courses'>
                                {courses.map((cards, index) => (
                                    <Cards
                                        key={index}
                                        InstitutionImage={cards.InstitutionImage}
                                        InstitutionName={cards.course_name}
                                        CourseShortName={cards.CourseShortName}
                                        CourseName={cards.course_description}
                                        CourseFee={cards.course_fee}
                                        CourseDurationy={cards.course_duration_year}
                                        CourseDurationm={cards.course_duration_month}
                                        CourseId={cards.course_id}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                    <Contact />
                </div>
            </div>
        </>
    )
}

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Apicard from '../components/Apicard';
import Contact from '../components/Contact';

export default function UniversityProfileApi() {
  const { university_user_id } = useParams();
  const [university, setUniversity] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const navigate = useNavigate();
  // Fetch university details
  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        const response = await axios.get(`http://ec2-65-0-21-186.ap-south-1.compute.amazonaws.com:9000/api/v1/university/profile/${university_user_id}`);
        setUniversity(response.data);
      } catch (error) {
        console.error('Error fetching university details:', error.message);
      }
    };

    fetchUniversityData();
  }, [university_user_id]);

  // Fetch university courses
  const fetchData = () => {
    axios
      .post('http://ec2-65-0-21-186.ap-south-1.compute.amazonaws.com:9000/api/v1/search/main', {
        entity: 'courses',
        page: 0,
        value: "",
        filter: null,
      })
      .then((response) => {
        console.log('Api data :', response.data);
        const responseData = response.data && response.data.data;
        const universitiesData = responseData && (responseData.universities || responseData.courses) || [];

        // filtered data
        const filteredData = universitiesData.filter((course) => course.university_user_id === university_user_id)
        setOriginalData(filteredData);
      })
      .catch((err) => {
        console.error('Error in API request:', err);
      });
  }
  useEffect(() => {
    // Initial API request
    fetchData();
  }, []);
  return (
    <>
      <div className='dup-body'>
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
              <img src='https://images.pexels.com/photos/2973323/pexels-photo-2973323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='insititute-banner' alt=''></img>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&usqp=CAU' className='Institute-details-image-2' alt='instituteimg'></img>
                <div className='Institute-address' style={{ margin: 0 }}>
                  <div className='institute-website-redirect' title='visit website'>
                    <h1>{university?.data?.university_name}</h1>
                  </div>
                  {university?.data && (
                    <p>{university.data.city}, {university.data.state}, {university.data.country}</p>
                  )}
                </div>
              </div>
              <div className='about' style={{ overflowWrap: 'break-word' }}>
                <h1>About us</h1>
                <div>
                  {university?.data?.about_us ? (
                  <p>{university.data.about_us}</p>
                ) : (
                  <p>{university?.data?.university_name} is on SavvyPool!</p>
                )}
                </div>
                
              </div>
              <h1>Courses</h1>
              <div className='provided-courses'>
                {
                  originalData.map((university) => (
                    <div onClick={() => {
                      navigate(`/course/${university.course_id}`);
                    }}>
                      <Apicard
                        key={university.user_id || university.Id}
                        University={university.university_name}
                        CourseName={university.course_name}
                        CourseFee={university.course_fee}
                        CourseFeeType={university.course_fee_type}
                        logo={university.logo_url}
                        city={university.city}
                        state={university.state}
                        country={university.country}
                        CourseId={university.course_id}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <Contact />
        </div>
      </div>
    </>
  );
}

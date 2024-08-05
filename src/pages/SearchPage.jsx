import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import { useCardData } from '../components/CourseDataContext';
import Cards from '../components/Cards';
import Pagination from '../components/Pagination';

export default function SearchPage() {
  const navigate = useNavigate();
  const { cardData } = useCardData();
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setIsInitialLoad(false);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setIsInitialLoad(false);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    setIsInitialLoad(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterCourses = (courses, selectedLocation, selectedDuration, selectedMode) => {
    let filteredCourses = courses;

    if (selectedLocation !== '') {
      filteredCourses = filteredCourses.filter(course => course.City === selectedLocation);
    }

    if (selectedMode !== '') {
      filteredCourses = filteredCourses.filter(course => course.ModeOfTeaching === selectedMode);
    }

    if (selectedDuration !== '') {
      filteredCourses = filteredCourses.filter(course => course.CourseDuration === selectedDuration);
    }

    return filteredCourses;
  };

  const filteredCourses = filterCourses(cardData, location, duration, mode);
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  return (
    <>
      <div className="dup-body">
        <div className='dup-body-wrap'>
          <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
          <hr className='hr'></hr>
          <div className='searchpage-container'>
            <div className='search-filters'>
              <button>Filter By</button>
              <div className='filter-container'>
                
                <div className='filters'>
                  {/* <h1>Location : </h1> */}
                  <div className="custom-select">
                    <select
                      value={location}
                      onChange={handleLocationChange}
                    >
                      <option value="">Location</option>
                      <option value="Kannur">Kannur</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Calicut">Calicut</option>
                      <option value="Bangalore">Bangalore</option>
                    </select>
                  </div>
                </div>
                <div className='filters'>
                  {/* <h1>Mode : </h1> */}
                  <div className="custom-select">
                    <select
                      value={mode}
                      onChange={handleModeChange}
                    >
                      <option value="">Mode</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                      <option value="Online/Offline">Both</option>
                    </select>
                  </div>
                </div>
                <div className='filters'>
                  {/* <h1>Duration : </h1> */}
                  <div className="custom-select">
                    <select
                      value={duration}
                      onChange={handleDurationChange}
                    >
                      <option value="">Duration</option>
                      <option value="Less than 3 Months">Less than 3 Months</option>
                      <option value="Less than 6 Months">Less than 6 Months</option>
                      <option value="Less than 12 Months">Less than 12 Months</option>
                      <option value="More than 12 Months">More than 12 Months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              className="course-cards"
              initial={isInitialLoad ? { opacity: 0, y: 100 } : { opacity: 1, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, staggerChildren: 0.1 }} // Add staggerChildren property
            >
              {filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((course, index) => (
                <motion.div key={course.CourseId} style={{ marginBottom: '1rem' }} // Add a margin to create space between cards
                  initial={{ opacity: 0, y: 100 }} // Initial state for each card
                  animate={{ opacity: 1, y: 0 }} // Animation state for each card
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Add a delay that increments with each card
                >
                  <Cards
                    InstitutionImage={course.InstitutionImage}
                    InstitutionName={course.InstitutionName}
                    CourseName={course.CourseName}
                    CourseFee={course.CourseFee}
                    CourseDuration={course.CourseDuration}
                    onClick={() => {
                      switch (course.CourseId) {
                        default:
                          navigate(`/shortcourse/course-details/${course.CourseId}`);
                          break;
                      }
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
          <Contact />
        </div>
      </div>
    </>
  );
}

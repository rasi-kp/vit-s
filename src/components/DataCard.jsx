import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Cards from './Cards';
import { motion } from 'framer-motion';
import { fetchPrograms } from '../services/CommonApi';

export default function DataCard() {
  const location = useLocation();
  const { category_id } = location.state || '';
  const { shortname } = useParams();
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response= await fetchPrograms({category_id:category_id})
        setCardData(response.courses);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [shortname]);

  return (
    <>
      <div className='course-meter'>
        <h1 className='Container-title'>{shortname}</h1>
        <p>( Courses found : {cardData && cardData.length || 'Not Found'} )</p>
      </div>
      <div className='card-container'>
        {cardData && cardData.map((cards, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.09 }}
          >
            <Cards
              InstitutionImage={cards.InstitutionImage}
              InstitutionName={cards.institution_name}
              CourseShortName={cards.course_name}
              CourseName={cards.course_name}
              CourseFee={cards.course_fee}
              CourseDuration={cards.course_duration_year}
              CourseId={cards.course_id}
              onClick={() => {
                switch (cards.course_id) {
                  default:
                    navigate(`/shortcourse/course-details/${cards.course_id}`, { state: { course_id: cards.course_id } });
                    break;
                }
              }}
            />
          </motion.div>
        ))}
      </div>
    </>
  )
}

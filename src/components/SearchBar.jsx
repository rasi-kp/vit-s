import React, { useState, useRef, useEffect } from 'react';
import { useCardData } from './CourseDataContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { allcategory } from '../services/CommonApi';

export default function SearchBar({ placeholder }) {
  const navigate = useNavigate();
  const data = useCardData();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [inputActive, setInputActive] = useState(false);
  const [closeRelatedData, setCloseRelatedData] = useState(false);
  const [categories, setCategories] = useState([]);
  const inputRef = useRef(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    const response = await allcategory()
    if (response.sub_categories) {
      setCategories(response.sub_categories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const textEnter = (event) => {
    const searchTerm = event.target.value;
    setWordEntered(searchTerm);
    // Split the search term into individual words
    const searchWords = searchTerm.toLowerCase().split(' ');
    console.log(searchWords);
    const newSearchTerm = data.cardData.filter((value) => {
      if (
        typeof value.InstitutionName === 'string' &&
        typeof value.CourseName === 'string' &&
        typeof value.CourseShortName === 'string'
      ) {

        // Check if any of the search words match the institution name or course name
        return searchWords.some((word) =>
          value.InstitutionName.toLowerCase().includes(word) ||
          value.CourseName.toLowerCase().includes(word) ||
          value.CourseShortName.toLowerCase().includes(word)
        );
      }
      return false; // Skip non-string values
    });

    if (searchTerm === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newSearchTerm);
    }
  };

  const clearTerm = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleDocumentClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      // Click occurred outside the input field
      setInputActive(false);

      // Delay closing the related data for a moment to allow for clicking on links
      setTimeout(() => {
        setCloseRelatedData(false);
      }, 200); // Adjust the delay time as needed
    }
  };

  useEffect(() => {
    // Add a document click event listener to handle clicks outside of the input field
    document.addEventListener('click', handleDocumentClick);

    return () => {
      // Remove the document click event listener when the component unmounts
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  // Function to highlight the search term in text
  function highlightSearchTerm(text, searchTerm) {
    const regex = new RegExp(searchTerm, "gi");
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }

  return (
    <>
      <div className='search'>
        <div className='search-inputs' ref={inputRef}>
          <input
            type='text'
            placeholder={placeholder}
            value={wordEntered}
            onChange={textEnter}
            onFocus={() => {
              setInputActive(true);
              setCloseRelatedData(false); // Prevent closing related data when input is focused
            }}
          />
          <svg height="25" width="2">
            <line x1="0" y1="100" className='search-vl' />
          </svg>
          <div className='search-button'>
            {filteredData.length === 0 ? (
              <img src='/img/Search.svg' id='search-button' alt='search-button' onClick={() => {
                setInputActive(true);
                setCloseRelatedData(false); // Prevent closing related data when input is focused
              }} />
            ) : (
              <FontAwesomeIcon icon={faTimes} id='search-button' onClick={clearTerm} />
            )}
          </div>
        </div>
        {inputActive && !closeRelatedData && filteredData.length === 0 && (
          <motion.div
            className='search-absolute'
            initial={{ height: 0 }} // Initial height is 0
            animate={{ height: '540px' }} // Active state, adjust as needed
            transition={{ duration: 0.5 }} // Animation duration
          >
            <div className='search-related'>
              <p className='search-related-p'><img src='/img/Search.svg' alt='search-button' /> Courses for you</p>
              <div className='related-courses-row'>
                {categories.map(category => (
                  <Link key={category.category_id} to={`/shortcourse/${category.category_name.toLowerCase().replace(/ /g, '-')}`} state={{ category_id: category.category_id }}>
                    <h1 className='search-h1'>{category.category_name}</h1>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {filteredData.length !== 0 && (
          <div className='dataResult'>
            <p className='search-title'>Search results for "{wordEntered}"</p>
            {filteredData.slice(0, 4).map((value, key) => {
              return (
                <div className='dataItem' key={key}>
                  <div>
                    {key === 0 && (
                      <div className='search-courseShortName'>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(
                              value.CourseShortName,
                              wordEntered
                            ),
                          }}
                        ></span>
                        <div className='search-course-count'><h1 className=''>( Available courses : {filteredData.length} )</h1></div>
                      </div>
                    )}
                    <p className='course-p'>Did you mean:</p>
                    <p className='course-name-title'
                      onClick={() => {
                        navigate(`/shortcourse/course-details/${value.CourseId}`);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchTerm(value.CourseName, wordEntered),
                      }}
                    ></p>
                    <p className='course-name'>
                      Offered by {value.InstitutionName}, Duration: {value.CourseDuration}, Location: {value.City}, {value.State}
                    </p>
                  </div>
                </div>
              );
            })}
            <hr className='search-hr'></hr>
            <div className='search-related'>
              <p className='search-related-p'><img src='/img/Search.svg' alt='search-button' /> Courses for you</p>
              <div className='related-courses-row'>
                {categories.map(category => (
                  <Link key={category.category_id} >
                    <h1 className='search-h1'>{category.category_name}</h1>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

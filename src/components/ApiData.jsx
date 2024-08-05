import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Apicard from './Apicard';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { allcategory, allinsitutes, allprograms, fetchPrograms } from '../services/CommonApi';
import { Box, Button, CircularProgress, FormControlLabel, IconButton, Radio, RadioGroup, Typography } from '@mui/material';

const ApiData = () => {
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [filteredData, setFilteredData] = useState([]);
  const [page, setpage] = useState(1)
  const totalPagesRef = useRef(1)
  const fetchInitiatedRef = useRef(false); // Ref to prevent multiple initial fetches

  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [institutions, setInstitutions] = useState([])
  const [locations, setLocations] = useState([])
  const [category_id, setCategoryFilter] = useState(0);
  const [institution_id, setInstitutionFilter] = useState(0);
  const [location, setLocationFilter] = useState('');
  const [clickcategory, setclickcategory] = useState(false)
  const [clickinstitution, setclickinstitution] = useState(false)
  const [clicklocation, setclicklocation] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
  const handleInstitutionChange = (e) => setInstitutionFilter(e.target.value);
  const handleLocationChange = (e) => setLocationFilter(e.target.value);

  //fetch categories special function
  const fetchCategories = (courses) => {
    const categorySet = new Set(categories.map(cat => `${cat.category_id}: ${cat.category_name}`));
    courses.forEach(course => {
      course.categories.forEach(category => {
        categorySet.add(`${category.category_id}: ${category.category_name}`);
      });
    });
    const newCategories = Array.from(categorySet).map(item => {
      const [category_id, category_name] = item.split(': ');
      return { category_id: parseInt(category_id), category_name };
    });
    setCategories(newCategories);
  };
//fetch institutes special function
  const fetchInstitutions = (courses) => {
    const institutionSet = new Set(institutions.map(inst => `${inst.institution_id}: ${inst.institution_name}`));
    courses.forEach(course => {
      institutionSet.add(`${course.institution_id}: ${course.institution_name}`);
    });

    const newInstitutions = Array.from(institutionSet).map(item => {
      const [institution_id, institution_name] = item.split(': ');
      return { institution_id: parseInt(institution_id), institution_name };
    });
    setInstitutions(newInstitutions);
  };
  //fetch locations special function
  const fetchLocations = (courses) => {
    const locationMap = new Map();
  
    // Add existing locations to the map
    locations.forEach(loc => {
      if (!locationMap.has(loc.city)) {
        locationMap.set(loc.city, { city: loc.city, state: loc.state, country: loc.country, id: loc.id });
      }
    });
  
    // Add new locations from courses to the map
    courses.forEach(course => {
      if (course.course_locations) {
        course.course_locations.forEach(location => {
          if (!locationMap.has(location.city)) {
            locationMap.set(location.city, { city: location.city, state: location.state, country: location.country, id: location.location_id });
          }
        });
      }
    });
  
    // Convert the map back to an array and set the state
    const newLocations = Array.from(locationMap.values());
    setLocations(newLocations);
  };
  
  //handle scroll pagination function
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!loading && page < totalPagesRef.current) {
        setpage(prevPage => {
          const newPage = prevPage + 1;
          fetchData(newPage);
          return newPage;
        });
      }
    }
  }, [loading, page]);

  

//initial calling datafetching with pagination
  useEffect(() => {
    if (category_id || location || institution_id) {
      fetchfilter();
    } else {
      if (!fetchInitiatedRef.current) {
        fetchInitiatedRef.current = true;
        fetchData(page);
      }
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [category_id, location, institution_id, handleScroll, page]);

  const fetchfilter = async () => {
    try {
      const params = {category_id,location,institution_id};
      const data = await fetchPrograms(params);
      setFilteredData(data.courses || []);
      if (!data.courses) {
        setFilteredData([]);
        setOriginalData([])
        return (
          <div className='dup-body'>
            <div className='dup-body-wrap'>
              <div className='course-none'>
                <img src='/img/error.svg' alt='error svg'></img>
                <p>The course you were looking for</p>
                <h1>Was not found.</h1>
              </div>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  const fetchData = async (pageToFetch) => {
    setLoading(true);
    try {
      const response = await allprograms(pageToFetch);
      totalPagesRef.current = response.total_pages;
      setOriginalData(prevData => [...prevData, ...response.courses]);
      fetchCategories(response.courses);
      fetchInstitutions(response.courses);
      fetchLocations(response.courses);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='dup-body-wrap'>
      <Navbar title='SavvyPool' nav1='Home' nav2='List your institute' />
      <hr className='hr'></hr>
      <div className='university-course-container'>
        <div className='searchpage-container'>
          <div className='filter-container'>
            <div className='filters'>
            <div style={{ marginBottom: '20px' }}>
                <Typography onClick={e=>setclickinstitution(!clickinstitution)}
                  style={{
                    borderRadius: '20px', borderColor: '#FFEB3B', borderWidth: '2px',
                    padding: '2px', paddingLeft: '25px', position: 'relative', cursor: "pointer"
                  }} variant="h6">
                  Institution
                  <span style={{ position: 'absolute', right: '10px', fontSize: '27px' }}>&#9662;</span>
                </Typography>

                {clickinstitution && (
                  <Box style={{
                    padding: '10px', border: '2px solid grey',
                    borderRadius: '10px', marginTop: '10px', height: '244px', // Adjust the height as needed
                    overflowX: 'hidden', overflowY: 'auto',
                  }} >
                    <RadioGroup value={institution_id} onChange={handleInstitutionChange}>
                      {institutions.map((institute, index) => (
                        <FormControlLabel
                          key={institute.institution_id}
                          value={institute.institution_id}
                          control={<Radio />}
                          label={institute.institution_name}
                          labelPlacement="start"
                          style={{ justifyContent: 'space-between', marginLeft: 0 }}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Typography onClick={e=>setclickcategory(!clickcategory)}
                  style={{
                    borderRadius: '20px', borderColor: '#FFEB3B', borderWidth: '2px',
                    padding: '2px', paddingLeft: '25px', position: 'relative', cursor: "pointer"
                  }} variant="h6">
                  Category
                  <span style={{ position: 'absolute', right: '10px', fontSize: '27px' }}>&#9662;</span>
                </Typography>
                {clickcategory && (
                  <Box style={{
                    padding: '10px', border: '2px solid grey',
                    borderRadius: '10px', marginTop: '10px', height: '244px', // Adjust the height as needed
                    overflowX: 'hidden', overflowY: 'auto',
                  }} >
                    <Box />
                    <RadioGroup value={category_id} onChange={handleCategoryChange}>
                      {categories.map((category, index) => (
                        <FormControlLabel
                          key={category.category_id}
                          value={category.category_id}
                          control={<Radio />}
                          label={category.category_name}
                          labelPlacement="start"
                          style={{ justifyContent: 'space-between', marginLeft: 0 }}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Typography onClick={e => setclicklocation(!clicklocation)}
                  style={{
                    borderRadius: '20px', borderColor: '#FFEB3B', borderWidth: '2px',
                    padding: '2px', paddingLeft: '25px', position: 'relative', cursor: "pointer"
                  }} variant="h6">
                  Location
                  <span style={{ position: 'absolute', right: '10px', fontSize: '27px' }}>&#9662;</span>
                </Typography>
                {clicklocation && (
                  <Box style={{
                    padding: '10px', border: '2px solid grey',
                    borderRadius: '10px', marginTop: '10px', height: '244px', // Adjust the height as needed
                    overflowX: 'hidden', overflowY: 'auto',
                  }} >
                    <RadioGroup value={location} onChange={handleLocationChange}>
                      {locations.map((location, index) => (
                        <FormControlLabel
                          key={location.city}
                          value={location.city}
                          control={<Radio />}
                          label={location.city}
                          labelPlacement="start"
                          style={{ justifyContent: 'space-between', marginLeft: 0 }}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='university-course'>
          {/* {error && <div>Error: {error.message}</div>} */}
          {filteredData.length > 0 ? (
            filteredData.map((university) => (
              <div key={university.course_id} onClick={() => {
                navigate(`/shortcourse/course-details/institute/${university.institution_name}`,{state:{institute_id:university.institution_id}})
                // navigate(`/shortcourse/course-details/${university.course_id}`, { state: { course_id: university.course_id } })
              }}>
                <Apicard
                  Institutionname={university.institution_name}
                  CourseName={university.course_name}
                  Coursedescription={university.course_description}
                  CourseFee={university.course_fee}
                  CourseDurationy={university.course_duration_year || ''}
                  CourseDurationm={university.course_duration_month || ''}
                  CourseFeeType={university.course_fee_type}
                  logo={university.logo_url}
                  city={university.city}
                  state={university.state}
                  country={university.country}
                  CourseId={university.course_id}
                />
              </div>
            ))
          ) : originalData.length > 0 ? (
            originalData.map((university) => (
              <div key={university.course_id} onClick={() => {
                navigate(`/shortcourse/course-details/institute/${university.institution_name}`,{state:{institute_id:university.institution_id}})
                // navigate(`/shortcourse/course-details/${university.course_id}`, { state: { course_id: university.course_id } })
              }}>
                <Apicard
                  Institutionname={university.institution_name}
                  CourseName={university.course_name}
                  Coursedescription={university.course_description}
                  CourseFee={university.course_fee}
                  CourseDurationy={university.course_duration_year || ''}
                  CourseDurationm={university.course_duration_month || ''}
                  CourseFeeType={university.course_fee_type}
                  logo={university.logo_url}
                  city={university.city}
                  state={university.state}
                  country={university.country}
                  CourseId={university.course_id}
                />
              </div>
            ))
          ) : (
            // <div className='dup-body'>
            // <div className='dup-body-wrap'>
            <div className='course-none'>
              <img src='/img/error.svg' alt='error svg'></img>
              <p>The course you were looking for</p>
              <h1>Was not found.</h1>
            </div>
            // </div>
            // </div>
          )}

        </div>

      </div>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default ApiData;





// //click category for filtering
// const clickcategoryf = async () => {
//   if (categories.length > 0) {
//     setclickcategory(!clickcategory)
//   } else {
//     const response = await allcategory()
//     console.log(response)
//     setCategories(response.sub_categories)
//     setclickcategory(!clickcategory)
//   }
//   setclickcategory(!clickcategory)

// }
// //click institute for filtering
// const clickinstitutionbutton = async () => {
//   if (institutions.length > 0) {
//     setclickinstitution(!clickinstitution)
//   } else {
//     setclickinstitution(!clickinstitution)
//     const response = await allinsitutes({ limit: 5, page: 1 })
//     console.log(response)
//     setInstitutions(response.institute)
//     settotalpagesinstitute(response.total_pages)
//   }
// }


  //institutefetchpagination inside filter 
  // const loadInstitutions = async () => {
  //   console.log("inside");
  //   if (loadingRef.current) return;
  //   loadingRef.current = true;
  //   const response = await allinsitutes({ limit: 5, page: pageinstitute });
  //   console.log(response);
  //   setInstitutions(prevInstitutions => [...prevInstitutions, ...response.institute]);
  //   settotalpagesinstitute(response.total_pages);
  //   loadingRef.current = false;
  // };
  // const handleScrollinstitute = () => {
  //   const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
  //   if (bottom && pageinstitute < totpagesinstitute && !loadingRef.current) {
  //     setpageinstitute(prevPage => prevPage + 1);
  //   }
  // };
  // useEffect(() => {
  //   if (clickinstitution) {
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }
  // }, [clickinstitution, pageinstitute, totpagesinstitute]);
  // useEffect(() => {
  //   console.log(pageinstitute,totpagesinstitute);
  //   if (clickinstitution && pageinstitute <= totpagesinstitute) {
  //     console.log("hai");
  //     loadInstitutions();
  //   }
  // }, [pageinstitute]);

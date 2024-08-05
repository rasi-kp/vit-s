import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { addProgram, fetchInstitutes, updateInstitute, allcategory, editProgram, getProgrambyId, getlocationbyid, deletecategorybyid, deletelocationprogrambyid } from '../../services/ApiClientService';
import { AddCircle, AddIcCallOutlined } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProgram = ({ isModalOpen, setIsModalOpen, id, }) => {
  const { control, handleSubmit, setValue, reset, formState: { errors }, register, getValues } = useForm();

  const location1 = useLocation();
  const { institution_id, user_id } = location1.state || {};
  const [institutes, setInstitutes] = useState({});
  const [category, setcategory] = useState([]);
  const [selectedcategory, setselectedcategory] = useState([])
  const [totalPagescategory, setTotalPagescategory] = useState(0);
  const [pagecat, setPagecat] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [TeachingMode, setTechingMode] = useState('')
  const [curriculam, setcurriculam] = useState([])
  const [location, setlocation] = useState([''])
  const [selectlocation, setlocationselect] = useState([])
  const [locations, setLocations] = useState([]);
  const [emails, setEmails] = useState(['']);
  const [contactNumbers, setContactNumbers] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInstitute = async () => {
    try {
      setIsLoading(true);
      const responseData = await getProgrambyId(id, { Authorization: sessionStorage.getItem('accessToken') });
      console.log(responseData);
      setInstitutes(responseData);
      setcurriculam(responseData.course_curriculum || '')
      setselectedcategory(responseData.categories)
      setlocationselect(responseData.course_locations || []);
      setSelectedButton(responseData.course_fee_type);
      setTechingMode(responseData.teaching_mode)
      const emailsArray = responseData.contact_infos.filter(info => info.type === 'email').map(info => info.email_address);
      const phonesArray = responseData.contact_infos.filter(info => info.type === 'phone').map(info => info.phone_number);
      setEmails(emailsArray || []);
      setContactNumbers(phonesArray || []);
      reset(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const locationapi = async () => {
    try {
      const response = await getlocationbyid(institution_id,
        { Authorization: sessionStorage.getItem('accessToken') }
      )
      setlocation(response.course_locations);
    } catch (err) {
      console.log(err);
    }
  }

  const categoryfetch = async (page) => {
    try {
      setLoading(true);
      const responseData = await allcategory(
        { limit: 10, offset: page },
        { Authorization: sessionStorage.getItem('accessToken') }
      );
      setLoading(false);
      setcategory((prevcategory) => [...prevcategory, ...responseData.sub_categories]);
      setTotalPagescategory(responseData.total_pages);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstitute();
    categoryfetch(pagecat)
    if (institution_id != null) {
      locationapi()
    }
  }, [id]);
  useEffect(() => {
    if (institutes && institutes.contact_infos) {
      // Separate emails and phone numbers
      const emailsArray = institutes.contact_infos.filter(info => info.type === 'email').map(info => info.email_address);
      const phonesArray = institutes.contact_infos.filter(info => info.type === 'phone').map(info => info.phone_number);

      setLocations(institutes.locations || []);
      setEmails(emailsArray || []);
      setContactNumbers(phonesArray || []);
    }
  }, [institutes]);

  const handleScrollcategory = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !loading && pagecat < totalPagescategory) {
      setPagecat((prevPage) => prevPage + 1);
    }
  };

  const handleCategoryChange = (event) => {
    const [category_id, category_name] = event.target.value;
    if (category_id && category_name) {
      const newCategory = { category_id: category_id, category_name: category_name };

      setselectedcategory((prevCategories = []) => {
        if (!prevCategories.some(category => category.category_id === category_id)) {
          return [...prevCategories, newCategory];
        }
        return prevCategories;
      });
      setValue('coursecategory', '');
    }
  };
  const handleLocationChange = (event) => {
    const [id, city] = event.target.value;
    if (id && city) {
      const newLocation = { location_id: id, city: city };
      setlocationselect(prevloc => {
        if (!prevloc.some(loc => loc.location_id === id)) {
          return [...prevloc, newLocation];
        }
        return prevloc;
      });
      setValue('location', '');
    }
  };
  const handleRemovelocation = async (location_id) => {
    console.log(id);
    const response = await deletelocationprogrambyid(id, location_id, {
      Authorization: sessionStorage.getItem('accessToken')
    })
    if (response.status_code == 200) {
      toast.success("successfully deleted Location")
    } else {
      toast.error("failed to delete location")
    }
    setlocationselect(prevloc => prevloc.filter(location => location.location_id !== location_id));
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleRemoveCategory = async (category_id) => {
    console.log(category_id);
    setselectedcategory(prevCategories => prevCategories.filter(category => category.category_id !== category_id));
    const response = await deletecategorybyid(id, category_id, {
      Authorization: sessionStorage.getItem('accessToken')
    })
    if (response.status_code == 200) {
      toast.success("successfully deleted category")
    } else {
      toast.error("failed to delete category")
    }

  };

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };
  const handleteachingmode = (value) => {
    setTechingMode(value)
  }
  const handleAddCurriculum = () => {
    const curriculumValue = getValues('courseCurriculum');
    if (curriculumValue) {
      setcurriculam((prevCurriculam) => [...prevCurriculam, curriculumValue]);
      setValue('courseCurriculum', '');
    }
  };

  const onSubmit = async (data) => {
    const programData = {
      institution_id: institutes.institution_id,
      course_id: institutes.course_id,
      course_name: data.courseName,
      course_description: data.CourseDescription,
      course_category: data.courseCategory || institutes.course_category,
      course_sub_category: selectedcategory,
      course_sub_category: selectedcategory.map(item => item.category_id.toString()),
      course_duration_year: data.courseDurationYear || 0,
      course_duration_month: data.courseDurationMonth,
      course_curriculum: data.courseCurriculum,
      course_fee: data.courseFee,
      course_fee_type: selectedButton,
      currency_code: 'INR',
      teaching_mode: TeachingMode || '',
      location_ids: selectlocation.map(data => data.location_id.toString())
    };
    console.log(programData);
    try {
      const data = await editProgram(programData, {
        Authorization: sessionStorage.getItem('accessToken'),
      });
      if (data.status_code == 200) {
        toast.success('Program Updated Successfully');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error.message);
    }
    reset();
    handleCloseModal();
  };
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box p={4} bgcolor="background.paper"
        style={{ margin: '30px auto', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <Typography variant="h6" component="h2">
          Edit Program
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
            <Controller
              name="courseName"
              control={control}
              defaultValue={institutes.course_name}
              rules={{ required: 'Institute Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Name"

                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: '20px', marginTop: '20px' }}
                  required
                />
              )}
            />

            <Controller name="CourseDescription" control={control}
              defaultValue={institutes.course_description}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  style={{ marginBottom: '20px' }} required
                />
              )}
            />
            <Controller
              name="courseCategory"
              control={control}
              render={({ field }) => (
                <FormControl
                  // key={institutes.course_category}
                  defaultValue={institutes.course_category}
                  variant="outlined" fullWidth style={{ marginBottom: '20px' }} required>
                  <InputLabel>Course Category</InputLabel>
                  <Select
                    {...field}
                    value={field.value || institutes.course_category}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    label="Course category">
                    <MenuItem value="Short Term Course" >Short Term Course</MenuItem>
                    <MenuItem value="Under Graduate">Under Graduate</MenuItem>
                    <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller name="coursesubcategory" control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px', }} >
                  <InputLabel>Course Sub Category</InputLabel>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        onScroll: handleScrollcategory,
                        style: { maxHeight: 300, overflow: 'auto' } // Set maxHeight and overflow for scrollable
                      }
                    }}
                    {...field}
                    value={field.value || []}
                    onChange={(e) => {
                      field.onChange(e);
                      handleCategoryChange(e);
                    }}
                    label="Course_Sub_Category">
                    <MenuItem value="">
                      <em>Select...</em>
                    </MenuItem>
                    {category && category.map((option) => (
                      <MenuItem key={option.category_id} value={[option.category_id, option.category_name]}>
                        {option.category_name}
                      </MenuItem>
                    ))}
                    {loading && (
                      <MenuItem disabled>
                        <Box display="flex" justifyContent="center" width="100%">
                          <CircularProgress size={24} />
                        </Box>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              )}
            />
            {selectedcategory && selectedcategory.map((data) => (
              <Button key={data.category_id} variant="outlined"
                style={{ marginBottom: '20px', marginRight: '10px', borderRadius: '20px', color: 'black', borderWidth: '2px', position: 'relative' }}>
                {data.category_name}
                <IconButton size="small"
                  style={{ position: 'absolute', top: '-15px', right: '-10px' }}
                  onClick={() => handleRemoveCategory(data.category_id)} >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Button>
            ))}
            <Typography marginBottom={1} variant="body1">Course Duration :</Typography>

            <FormControl variant="outlined" style={{ minWidth: 100, marginBottom: '20px', marginRight: '20px' }}>
              <InputLabel id="select-year-label">Year</InputLabel>
              <Select labelId="select-year-label" id="select-year" label="Year"
                defaultValue={institutes.course_duration_year}
                {...register('courseDurationYear')} >
                <MenuItem value={0}>0 Year</MenuItem>
                <MenuItem value={1}>1 Year</MenuItem>
                <MenuItem value={2}>2 Years</MenuItem>
                <MenuItem value={3}>3 Years</MenuItem>
                <MenuItem value={4}>4 Years</MenuItem>
                <MenuItem value={5}>5 Years</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" style={{ minWidth: 100, marginBottom: '20px' }}>
              <InputLabel id="select-month-label">Month</InputLabel>
              <Select labelId="select-month-label" id="select-month" label="Month"
                defaultValue={institutes.course_duration_month}
                {...register('courseDurationMonth')} required >
                <MenuItem value={0}>0 Months</MenuItem>
                <MenuItem value={1}>1 Months</MenuItem>
                <MenuItem value={2}>2 Months</MenuItem>
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={4}>4 Months</MenuItem>
                <MenuItem value={5}>5 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
                <MenuItem value={7}>7 Months</MenuItem>
                <MenuItem value={8}>8 Months</MenuItem>
                <MenuItem value={9}>9 Months</MenuItem>
                <MenuItem value={11}>11 Months</MenuItem>
              </Select>
            </FormControl>

            <Controller name="courseCurriculum" control={control}
              defaultValue={institutes.course_curriculum}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Course Curriculam"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={5}
                  style={{ marginBottom: '20px' }}
                />
              )}
            />

            <Controller name="courseFee" control={control}
              defaultValue={institutes.course_fee}
              render={({ field }) => (
                <TextField
                  {...field} label="Course Fee" variant="outlined"

                  fullWidth multiline style={{ marginBottom: '20px' }}
                />
              )}
            />
            {/* button month year total */}
            <Button variant="outlined"
              style={{
                marginRight: '10px', marginBottom: '20px', borderRadius: '20px', color: 'black',
                backgroundColor: selectedButton === 'month' ? 'yellow' : 'white', borderWidth: '2px',
              }}
              onClick={() => handleButtonClick('month')}>
              Month
            </Button>
            <Button variant="outlined"
              style={{
                marginRight: '10px', marginBottom: '20px', borderRadius: '20px', color: 'black',
                backgroundColor: selectedButton === 'year' ? 'yellow' : 'white', borderWidth: '2px',
              }}
              onClick={() => handleButtonClick('year')} >
              Year
            </Button>
            <Button variant="outlined"
              style={{
                marginRight: '10px', marginBottom: '20px', borderRadius: '20px', color: 'black',
                backgroundColor: selectedButton === 'total' ? 'yellow' : 'white', borderWidth: '2px',
              }}
              onClick={() => handleButtonClick('total')}>
              Total
            </Button>
            <Typography marginBottom={1} variant="body1">Teaching Mode :</Typography>

            <Button variant="outlined"
              style={{
                marginRight: '10px', marginBottom: '20px', borderRadius: '20px', color: 'black',
                backgroundColor: TeachingMode === 'online' ? 'yellow' : 'white', borderWidth: '2px',
              }}
              onClick={() => handleteachingmode('online')} >
              Online
            </Button>
            <Button variant="outlined"
              style={{
                marginRight: '10px', marginBottom: '20px', borderRadius: '20px', color: 'black',
                backgroundColor: TeachingMode === 'offline' ? 'yellow' : 'white', borderWidth: '2px',
              }}
              onClick={() => handleteachingmode('offline')}>
              Offline
            </Button>
            <Controller name="location" control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px', }}>
                  <InputLabel>Location</InputLabel>
                  <Select
                    {...field}
                    label="Location"
                    onChange={(e) => {
                      field.onChange(e);
                      handleLocationChange(e);
                    }}>
                    {location && location.map((option) => (
                      <MenuItem key={option.location_id} value={[option.location_id, option.city]}>
                        {option.city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {selectlocation.map((data) => (
              <Button key={data.location_id} variant="outlined"
                style={{ marginBottom: '20px', marginRight: '10px', borderRadius: '20px', color: 'black', borderWidth: '2px', position: 'relative' }}>
                {data.city}
                <IconButton size="small"
                  style={{ position: 'absolute', top: '-15px', right: '-10px' }}
                  onClick={() => handleRemovelocation(data.location_id)} >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Button>
            ))}
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Modal >
  );
};

export default AddProgram;

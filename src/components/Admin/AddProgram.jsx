import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

import { addProgram, fetchInstitutes, updateInstitute, allcategory, getlocationbyid } from '../../services/ApiClientService';
import { AddCircle, AddIcCallOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';

const AddProgram = ({ isModalOpen, setIsModalOpen, instituteid }) => {
    const { control, handleSubmit, setValue, formState: { errors }, register, getValues } = useForm();

    const [institutes, setInstitutes] = useState([]);
    const [category, setcategory] = useState([]);
    const [selectedcategory, setselectedcategory] = useState([])
    const [totalPages, setTotalPages] = useState(0);
    const [totalPagescategory, setTotalPagescategory] = useState(0);
    const [page, setPage] = useState(1);
    const [pagecat, setPagecat] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedButton, setSelectedButton] = useState('');
    const [TeachingMode, setTechingMode] = useState('')
    const [curriculam, setcurriculam] = useState([])
    const [location, setlocation] = useState([''])
    const [selectlocation, setlocationselect] = useState([])

    const locationapi = async () => {
        try {
            const response = await getlocationbyid(instituteid,
                { Authorization: sessionStorage.getItem('accessToken') }
            )
            setlocation(response.course_locations);
        } catch (err) {
            console.log(err);
        }
    }


    const fetchInstitute = async (page) => {
        try {
            setLoading(true);
            const responseData = await fetchInstitutes(
                { limit: 10, page: page },
                { Authorization: sessionStorage.getItem('accessToken') }
            );
            setLoading(false)
            setInstitutes((prevInstitutes) => [...prevInstitutes, ...responseData.institute]);
            setTotalPages(responseData.total_pages);
        } catch (error) {
            console.error(error);
        }
    };
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
        fetchInstitute(page);
        categoryfetch(pagecat)
        if (instituteid != null) {
            locationapi()
        }
    }, [page, pagecat]);

    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight && !loading && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    const handleScrollcategory = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight && !loading && pagecat < totalPagescategory) {
            setPagecat((prevPage) => prevPage + 1);
        }
    };

    const handleCategoryChange = (event) => {
        const [category_id, category_name] = event.target.value;
        if (category_id && category_name) {
            const newCategory = { id: category_id, course_name: category_name };

            setselectedcategory(prevCategories => {
                if (!prevCategories.some(category => category.id === category_id)) {
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
            const newLocation = { id: id, city: city };
            setlocationselect(prevloc => {
                if (!prevloc.some(loc => loc.id === id)) {
                    return [...prevloc, newLocation];
                }
                return prevloc;
            });
            setValue('location', '');
        }
    };
    const handleRemovelocation = (id) => {
        setlocationselect(prevloc => prevloc.filter(location => location.id !== id));
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleRemoveCategory = (id) => {
        setselectedcategory(prevCategories => prevCategories.filter(category => category.id !== id));
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
        if (!TeachingMode) {
            toast.error("select teaching mode")
            return
        }
        const programData = {
            institution_id: data.institutionId,
            course_name: data.courseName,
            course_description: data.CourseDescription,
            course_category: data.courseCategory,
            course_sub_category: selectedcategory.map(item => item.id.toString()),
            course_duration_year: data.courseDurationYear || 0,
            course_duration_month: data.courseDurationMonth || 0,
            course_curriculum: data.courseCurriculum,
            course_fee: data.courseFee,
            course_fee_type: selectedButton,
            currency_code: 'INR',
            teaching_mode: TeachingMode || '',
            location_ids: selectlocation.map(data => data.id.toString())
        };

        if (instituteid) {
            programData.institution_id = instituteid
        }
        try {
            const response = await addProgram(programData, {
                Authorization: sessionStorage.getItem('accessToken'),
            });
            if (response.status_code == 201) {
                toast.success('Program Added Successfully')
            }
        } catch (error) {
            toast.error("error adding program")
            console.error(error);
        }
        handleCloseModal();
    };
    return (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box p={4} bgcolor="background.paper"
                style={{ margin: '30px auto', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                <Typography variant="h6" component="h2">
                    Add Program
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                    {instituteid == null && <Controller name="institutionId" control={control}
                        render={({ field }) => (
                            <FormControl variant="outlined" fullWidth
                                style={{ marginBottom: '20px', marginTop: '20px' }}
                                required >
                                <InputLabel>Institute Name</InputLabel>
                                <Select
                                    {...field}
                                    label="Institute Name"
                                    MenuProps={{
                                        PaperProps: {
                                            onScroll: handleScroll,
                                            style: { maxHeight: 300, overflow: 'auto' } // Set maxHeight and overflow for scrollable
                                        }
                                    }}
                                    value={field.value}
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        const selectedInstitute = institutes.find(
                                            (option) => option.institution_id === selectedValue
                                        );
                                        field.onChange(selectedInstitute.institution_id);
                                        setlocation(selectedInstitute.locations);
                                    }}>
                                    {institutes.map((option) => (
                                        <MenuItem key={option.institution_id} value={option.institution_id}>
                                            {option.university_name}
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
                                <FormHelperText>{errors.instituteName?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />}
                    <Controller name="courseName" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Course Name"
                                variant="outlined"
                                fullWidth
                                error={!!errors.courseName}
                                helperText={errors.courseName?.message}
                                style={{ marginBottom: '20px' }}
                                required
                            />
                        )}
                    />
                    <Controller name="CourseDescription" control={control}
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
                    <Controller name="courseCategory" control={control}
                        render={({ field }) => (
                            <FormControl variant="outlined" fullWidth
                                style={{ marginBottom: '20px' }} required>
                                <InputLabel>Course Category</InputLabel>
                                <Select
                                    {...field}
                                    label="Course Category">
                                    <MenuItem value="Short Term Course" >Short Term Course</MenuItem>
                                    <MenuItem value="Under Graduate">Under Graduate</MenuItem>
                                    <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller name="coursesubcategory" control={control}
                        render={({ field }) => (
                            <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px', }} required >
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
                                    label="Course Sub Category">
                                    <MenuItem value="">
                                        <em>Select...</em>
                                    </MenuItem>
                                    {category.map((option) => (
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
                    {selectedcategory.map((data) => (
                        <Button key={data.id} variant="outlined"
                            style={{ marginBottom: '20px', marginRight: '10px', borderRadius: '20px', color: 'black', borderWidth: '2px', position: 'relative' }}>
                            {data.course_name}
                            <IconButton size="small"
                                style={{ position: 'absolute', top: '-15px', right: '-10px' }}
                                onClick={() => handleRemoveCategory(data.id)} >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Button>
                    ))}
                    <Typography marginBottom={1} variant="body1">Course Duration :</Typography>

                    <FormControl variant="outlined" style={{ minWidth: 100, marginBottom: '20px', marginRight: '20px' }}>
                        <InputLabel id="select-year-label">Year</InputLabel>
                        <Select labelId="select-year-label" id="select-year" label="Year"
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
                            {...register('courseDurationMonth')} required >
                            <MenuItem value={0}>0 Month</MenuItem>
                            <MenuItem value={1}>1 Month</MenuItem>
                            <MenuItem value={2}>2 Months</MenuItem>
                            <MenuItem value={3}>3 Months</MenuItem>
                            <MenuItem value={4}>4 Months</MenuItem>
                            <MenuItem value={5}>5 Months</MenuItem>
                            <MenuItem value={6}>6 Months</MenuItem>
                            <MenuItem value={7}>7 Months</MenuItem>
                            <MenuItem value={8}>8 Months</MenuItem>
                            <MenuItem value={9}>9 Months</MenuItem>
                            <MenuItem value={10}>10 Months</MenuItem>
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

                    {/* Display current entries in curriculum */}
                    {/* {curriculam.map((item, index) => (
                        <Button key={index} variant="outlined"
                            style={{ marginBottom: '20px', marginRight: '10px', borderRadius: '20px', color: 'black', borderWidth: '2px', position: 'relative' }}>
                            {item}
                        </Button>
                    ))} */}
                    <Controller name="courseFee" control={control}
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
                            <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px', }} required>
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
                        <Button key={data.id} variant="outlined"
                            style={{ marginBottom: '20px', marginRight: '10px', borderRadius: '20px', color: 'black', borderWidth: '2px', position: 'relative' }}>
                            {data.city}
                            <IconButton size="small"
                                style={{ position: 'absolute', top: '-15px', right: '-10px' }}
                                onClick={() => handleRemovelocation(data.id)} >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Button>
                    ))}
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal >
    );
};

export default AddProgram;

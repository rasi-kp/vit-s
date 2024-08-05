import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { motion } from 'framer-motion';
import { Button, Container, ThemeProvider, useMediaQuery, useTheme } from '@mui/material';
import adminTheme from '../../themes/adminTheme';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteProgram, fetchInstitutesbyIDAll, } from '../../services/ApiClientService';
import AddProgram from '../../components/Admin/AddProgram';
import EditInstituteForm from '../../components/Admin/EditInstituteForm';
import EditProgram from '../../components/Admin/EditAddprogram'
// import AWS from 'aws-sdk';
const S3_BUCKET = 'your-bucket-name';
const REGION = 'your-region';
const ACCESS_KEY = 'your-access-key';
const SECRET_ACCESS_KEY = 'your-secret-access-key';

// AWS.config.update({
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     region: REGION
// });

// const s3 = new AWS.S3();
export default function CoursesDetails() {
    const navigate = useNavigate()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [institute, setInstitute] = useState('')
    const [courses, setcourses] = useState([])
    const [expandedId, setExpandedId] = useState(null);
    const location = useLocation();
    const { institution_id, user_id } = location.state || {};
    const [addcourse, setaddcourse] = useState(false)
    const [editinstitute, seteditinstitute] = useState(false)
    const [editprogrammodal, setEditprogrammodal] = useState(false)
    const [editprogram, setEditprogram] = useState(null)

    const fetchInstitutes = async () => {
        try {
            const responseData = await fetchInstitutesbyIDAll(
                institution_id,
            );
            setInstitute(responseData);
            setcourses(responseData.courses)
        } catch (error) {
            console.error(error);
        }
    };
    console.log(institute);

    useEffect(() => {
        fetchInstitutes();
    }, [expandedId, editprogram, addcourse]);

    const toggleOptions = (id) => {
        if (expandedId === id) {
            setExpandedId(null); // Close options if already open
        } else {
            setExpandedId(id); // Open options for this course
        }
    };
    const handleEdit = async (id) => {
        setEditprogram(id);
        setEditprogrammodal(true)
    }
    const handleDelete = async (id) => {
        try {
            const data = await deleteProgram(id, { Authorization: sessionStorage.getItem('accessToken') })
            if (data) {
                toast.success("Successfully Deleted Course")
            }
        } catch (e) {
            toast.error(e)
            console.log(e);
        }
        setExpandedId(null);
    }
    const handleBack = () => {
        navigate('/admin', { state: { institution_id: null, user_id: null } });
    };
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        uploadFile(file);
    };

    const uploadFile = (file) => {
        const params = {
            Bucket: S3_BUCKET,
            Key: `images/${file.name}`,
            Body: file,
            ACL: 'public-read'
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.log("Error uploading file: ", err);
            } else {
                console.log("Successfully uploaded file: ", data.Location);
                // Update the logo URL here, possibly by setting the state or updating the database
            }
        });
    };

    return (
        <>
            {/* <div className={`dup-body ${isLoaded ? 'loaded' : ''}`}> */}
            <ThemeProvider theme={adminTheme}>
                <Container>
                    <div className='dup-body' >
                        <div className='dup-body-wrap'>
                            <motion.div
                                style={{ marginBottom: '1rem' }}
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }} >
                                <div className='Full-details'>
                                    <div className='sponsored-content'>
                                        <div onClick={handleBack} className='Arrow-div' style={{ fontSize: '24px', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                                            ←
                                        </div>
                                    </div>
                                    <div className='inst-detail' style={{}}>
                                        <h1 style={{ fontWeight: 'bold' }}>Institute Details</h1>
                                        <Button onClick={e => seteditinstitute(true)} variant="contained" startIcon={<EditIcon />}
                                            style={{
                                                height: '30px', position: 'absolute',
                                                top: isMobile ? '55px' : '90px',
                                                left: isMobile ? '20px' : '400px',
                                            }}
                                        >
                                            Edit Institute
                                        </Button>

                                        <div className='Institute-details' >
                                            <img src='https://images.pexels.com/photos/2973323/pexels-photo-2973323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='insititute-banner' alt=''></img>
                                            <div className='edit-icon-container' style={{
                                                position: 'absolute',
                                                top: isMobile ? '55px' : '90px',
                                                right: isMobile ? '25px' : '40px',
                                                backgroundColor: 'white',
                                                borderRadius: '25%',
                                                padding: '4px',
                                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                                            }}><EditIcon style={{ cursor: 'pointer' }} /></div>
                                            <img src="/logo.png" className='Institute-details-image-2' alt='instituteimg' />
                                            <div className='edit-icon-container' style={{
                                                position: 'absolute',
                                                top: isMobile ? '90px' : '170px',
                                                right: isMobile ? '120px' : '280px',
                                                backgroundColor: 'white',
                                                borderRadius: '25%',
                                                padding: '4px',
                                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                                            }}>
                                                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                                    <EditIcon />
                                                </label>
                                                <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileInput} />
                                            </div>
                                            <div className='Institute-address-none'>
                                                <div className='institute-website-redirect'>
                                                    <h3 style={{ cursor: 'default' }}>
                                                        {institute.university_name}
                                                        <a href={"https://" + institute.web_site} target="_blank" rel="noopener noreferrer">
                                                            <LaunchIcon style={{ cursor: 'pointer', marginLeft: '8px' }} />
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p>{institute.city}, {institute.state}, {institute.country}</p>
                                            </div>
                                        </div>


                                        <h5 style={{ fontWeight: 'bold' }}>About Us</h5>
                                        <p>{institute.about_us}</p>

                                        <div className='course-dur'>
                                            <h5 style={{ fontWeight: 'bold' }}>Courses</h5>
                                            <Button onClick={e => setaddcourse(true)} variant="contained" color="primary"
                                                style={{ height: '30px' }}>
                                                Add Course <AddIcon fontSize='small' />
                                            </Button>
                                        </div>
                                        <hr className='hr-tag'></hr>
                                        {/* <div className='dynamic-cards' onClick={onClick}> */}
                                        <div className='course-grid'>
                                            {courses && courses.map((course, index) => (
                                                <div className='dynamic-cardsadmin' key={index}>
                                                    <div className='card-institute'>
                                                        <div className='institute-card-titleadmin'>
                                                            <img src="/logo.png" className='institute-logo' alt='institute-logo' />
                                                            <h1>{course.course_name}</h1>
                                                        </div>
                                                        <div className='more-options'>
                                                            <MoreVertIcon style={{ cursor: 'pointer' }} onClick={() => toggleOptions(course.course_id)} />
                                                            {expandedId === course.course_id && (
                                                                <div className='options-dropdown'>
                                                                    <p onClick={() => handleEdit(course.course_id)}>Edit</p>
                                                                    <p onClick={() => handleDelete(course.course_id)}>Delete</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <hr className='card-hr' />
                                                    <div className='card-category'>
                                                        {/* <h1 className='card-title'>{course.course_name}</h1> */}
                                                        <p className='card-desc' style={{ marginTop: '15px' }}> {course.course_description}</p>
                                                    </div>
                                                    <div className='card-footer'>
                                                        <div className='course-fee'>
                                                            <h1 className='footer-title'>Course Fee</h1>
                                                            {course.course_fee ? (<p>{"Rs. " + course.course_fee + " /-"}</p>) : (<p>null</p>)}
                                                        </div>
                                                        <div className='vl'></div>
                                                        <div className='course-duration'>
                                                            <h1 className='footer-title'>Course Duration</h1>
                                                            <p>{course.course_duration_year && course.course_duration_year + ' year'} {course.course_duration_year && course.course_duration_month ? ("and ") : ''}{course.course_duration_month && course.course_duration_month + ' Months'} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {addcourse && <AddProgram isModalOpen={addcourse} setIsModalOpen={setaddcourse} instituteid={institution_id} />}
                    {editinstitute && (<EditInstituteForm isModalOpen={editinstitute} setIsModalOpen={seteditinstitute} instituteID={user_id} />)}
                    {editprogrammodal && <EditProgram isModalOpen={editprogram} setIsModalOpen={setEditprogram} id={editprogram} />}

                    <ToastContainer />
                </Container>
                <ToastContainer />
            </ThemeProvider>

        </>
    );
}

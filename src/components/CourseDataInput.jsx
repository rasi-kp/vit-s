// import React, { useState } from 'react';
// import { useCardData } from '../components/CourseDataContext';
// import Contact from './Contact';
// import Navbar from './Navbar';
// export default function CourseDataInput() {
//   const { cardData, setCardData } = useCardData();
//   console.log('Card Data:', cardData);
//   const [password, setPassword] = useState('') //for password
//   const [formVisible, setFormVisible] = useState(false)//for for to be visible
//   // Define state variables for each input field
//   const [institutionName, setInstitutionName] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [city, setCity] = useState('');
//   const [institutionImage, setInstitutionImage] = useState('');
//   const [courseDescription, setCourseDescription] = useState('');
//   const [courseName, setCourseName] = useState('');
//   const [courseShortName, setCourseShortName] = useState('');
//   const [courseFee, setCourseFee] = useState('');
//   const [courseDuration, setCourseDuration] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [eligibility, setEligibility] = useState('');
//   const [website, setWebsite] = useState('');
//   const [phone, setPhone] = useState('');
//   const [modeOfTeaching, setModeOfTeaching] = useState('');
//   const [programCurriculum, setProgramCurriculum] = useState('');
//   const [languages, setLanguages] = useState('');
//   const [skillLevel, setSkillLevel] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   // ... other fields ...

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();

//     if (password === 'savvy_779') {
//       setFormVisible(true);
//     } else {
//       alert('Incorrect Password Access Denied');
//     }
//     setPassword('');
//   }


//   // Function to handle the form submission
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log('form submitted')

//     // Create a new course object with the input data
//     const newCourse = {
//       InstitutionName: institutionName,
//       State: state,
//       Country: country,
//       City: city,
//       InstitutionImage: institutionImage,
//       CourseDescription: courseDescription,
//       CourseName: courseName,
//       CourseShortName: courseShortName,
//       CourseFee: courseFee,
//       CourseDuration: courseDuration,
//       CourseId: courseId,
//       Eligibility: eligibility,
//       Website: website,
//       Phone: phone,
//       ProgramCurriculum: programCurriculum,
//       ModeOfTeaching: modeOfTeaching,
//       Languages: languages,
//       SkillLevel: skillLevel,
//       ImageUrl: imageUrl,
//       // ... other fields ...
//     };
//     console.log('Institution Name:', institutionName)
//     // Update the cardData state with the new course
//     setCardData([...cardData, newCourse]);

//     // Clear the input fields
//     setInstitutionName('');
//     setState('');
//     setCountry('');
//     setCity('');
//     setInstitutionImage('');
//     setCourseDescription('');
//     setCourseName('');
//     setCourseShortName('');
//     setCourseFee('');
//     setCourseDuration('');
//     setCourseId('');
//     setEligibility('');
//     setWebsite('');
//     setPhone('');
//     setProgramCurriculum('');
//     setModeOfTeaching('');
//     setLanguages('');
//     setSkillLevel('');
//     setImageUrl('')
//     // ... clear other fields ...
//   };

//   return (
//     <>
//       <div className="dup-body">
//         <div className='dup-body-wrap'>
//           <Navbar title='SavvyPool' nav1="Home" nav2="List your institute" />
//           {!formVisible ? (
//             <div className='inputForm'>
//               <div className='inputbox'>
//                 <div className='inputBox'>
//                   <h1>Enter Password</h1>
//                   <form onSubmit={handlePasswordSubmit} className='PasswordSubmit'>
//                     <input
//                       type="passowrd"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className='Course-input'
//                     />
//                     <div className='Course-input-button'>
//                       <button type="submit" className='submit-button'>Submit</button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className='inputForm'>
//               <div className='inputBox'>
//                 <h2>Add a New Course</h2>
//                 <form onSubmit={handleFormSubmit} className='FormSubmit'>
//                   <div className='Course-input-field'>
//                     <label htmlFor="institutionName" className='Course-label'>Institution Name:</label>
//                     <input
//                       type="text"
//                       id="institutionName"
//                       value={institutionName}
//                       onChange={(e) => setInstitutionName(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="state" className='Course-label'>State:</label>
//                     <input
//                       type="text"
//                       id="state"
//                       value={state}
//                       onChange={(e) => setState(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="country" className='Course-label'>Country:</label>
//                     <input
//                       type="text"
//                       id="country"
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="city" className='Course-label'>City:</label>
//                     <input
//                       type="text"
//                       id="city"
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="institutionImage" className='Course-label'>Institution Image:</label>
//                     <input
//                       type="url"
//                       id="institutionImage"
//                       value={institutionImage}
//                       onChange={(e) => setInstitutionImage(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="courseDescription" className='Course-label'>Course Description:</label>
//                     <input
//                       type="text"
//                       id="courseDescription"
//                       value={courseDescription}
//                       onChange={(e) => setCourseDescription(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="courseName" className='Course-label'>Course Name:</label>
//                     <input
//                       type="text"
//                       id="courseName"
//                       value={courseName}
//                       onChange={(e) => setCourseName(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="courseShortName" className='Course-label'>Course Shortname:</label>
//                     <input
//                       type="text"
//                       id="courseShortName"
//                       value={courseShortName}
//                       onChange={(e) => setCourseShortName(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="courseFee" className='Course-label'>Course fee:</label>
//                     <input
//                       type="text"
//                       id="courseFee"
//                       value={courseFee}
//                       onChange={(e) => setCourseFee(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="courseDuration" className='Course-label'>Course Duration:</label>
//                     <input
//                       type="text"
//                       id="courseDuration"
//                       value={courseDuration}
//                       onChange={(e) => setCourseDuration(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="courseId" className='Course-label'>Course Id:</label>
//                     <input
//                       type="text"
//                       id="courseId"
//                       value={courseId}
//                       onChange={(e) => setCourseId(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="eligibility" className='Course-label'>Eligibility:</label>
//                     <input
//                       type="text"
//                       id="eligibility"
//                       value={eligibility}
//                       onChange={(e) => setEligibility(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="website" className='Course-label'>Website Url:</label>
//                     <input
//                       type="text"
//                       id="website"
//                       value={website}
//                       onChange={(e) => setWebsite(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="phone" className='Course-label'>Phone number:</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       value={phone}
//                       onChange={(e) => setPhone(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="modeOfTeaching" className='Course-label'>Mode of Teaching:</label>
//                     <input
//                       type="text"
//                       id="modeOfTeaching"
//                       value={modeOfTeaching}
//                       onChange={(e) => setModeOfTeaching(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="programCurriculum" className='Course-label'>Program curriculum:</label>
//                     <input
//                       type="text"
//                       id="programCurriculum"
//                       value={programCurriculum}
//                       onChange={(e) => setProgramCurriculum(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="languages" className='Course-label'>Languages:</label>
//                     <input
//                       type="text"
//                       id="languages"
//                       value={languages}
//                       onChange={(e) => setLanguages(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="skillLevel" className='Course-label'>Skill level:</label>
//                     <input
//                       type="text"
//                       id="skillLevel"
//                       value={skillLevel}
//                       onChange={(e) => setSkillLevel(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   <div className='Course-input-field'>
//                     <label htmlFor="imageUrl" className='Course-label'>Image Url</label>
//                     <input
//                       type="url"
//                       id="imageUrl"
//                       value={imageUrl}
//                       onChange={(e) => setImageUrl(e.target.value)}
//                       className='Course-input'
//                     />
//                   </div>
//                   {/* Add input fields for other course data */}
//                   <div className='Course-input-button'>
//                     <button type="submit" className='submit-button'>Add Course</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}
//           <Contact />
//         </div>
//       </div>
//     </>
//   );
// }
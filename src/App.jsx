import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Institute from './pages/Institute';
import Courses from './pages/Courses';
import CoursesDetails from './pages/CoursesDetails';
import { CourseDataProvider } from './components/CourseDataContext';
import SearchPage from './pages/SearchPage';
import Sample from './components/Privacy';
import Terms from './components/Terms';
import InstituteHomepage from './pages/InstituteHomepage';
import ScrollToTopOnPageChange from './components/ScrollToTopOnPageChange';
import ApiData from './components/ApiData';
import ApiCourseDetails from './pages/ApiCourseDetails';
import UniversityprofileApi from './pages/UniversityprofileApi';
// import AdminPanel from './pages/AdminPanel';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/Admin/LoginPage';
import AdminHomePage from './pages/Admin/AdminHomePage';
import AdminInstitute from './pages/Admin/ViewInstitute'

// import AddInstitute from './components/AddInstitute';
// import AddProgram from './components/AddProgram';
// import EditInstitute from './components/EditInstitute';
// import CourseDataInput from './components/CourseDataInput';

import Addcategory from './pages/Admin/Addcategory'

const AdminRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AdminHomePage /> : <LoginPage />;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTopOnPageChange />
        <CourseDataProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/institute" element={<Institute />} />
            {/* <Route path="/search" element={<SearchPage />} /> */}
            <Route path="/shortcourse/:shortname" element={<Courses />} />
            <Route path="/shortcourse/course-details/:courseId" element={<CoursesDetails />} />
            <Route path="/docs/privacyPolicy" element={<Sample />} />
            <Route path="/docs/termsofUse" element={<Terms />} />
            <Route path="/shortcourse/course-details/institute/:institutionName" element={<InstituteHomepage />} />
            <Route path='/search' element={<ApiData />} />
            <Route path="/course/:courseId" element={<ApiCourseDetails />} />
            <Route path='/course/institute/:university_user_id' element={<UniversityprofileApi />} />
            {/* <Route path='/admin' element={<AdminPanel/>} /> */}
            <Route path='/admin' element={<AdminRoute />} />
            <Route path='/admin/category' element={<Addcategory />} />
            <Route path='/admin/institute' element={<AdminInstitute />} />
            {/* <Route path='/admin/addinstitute' element={<AddInstitute />} />
            <Route path='/admin/addprogram' element={<AddProgram />} />
            <Route path='/admin/editinstitute' element={<EditInstitute />} /> */}
            {/* <Route path='/course/:universityId' element={ApiUniversity />}/> */}
            {/* <Route path='/94:5' element={<ApiSearchpage/>}/> */}
            {/* <Route path="/94:6" element={<CourseDataInput />} /> */}
          </Routes>
        </CourseDataProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

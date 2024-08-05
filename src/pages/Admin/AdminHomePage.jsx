import React, { useState, useEffect } from 'react';

import {
  Container, Button, Box, Typography, Table, TableBody, TableCell, TableContainer,
  TablePagination, TableRow, Paper, IconButton
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ThemeProvider } from '@mui/material/styles';
import adminTheme from '../../themes/adminTheme';
import Header from '../../components/Admin/Header';
import { fetchInstitutes as fetchInstitutesApi } from '../../services/ApiClientService';
import AddInstituteForm from '../../components/Admin/AddInstituteForm';
import EditInstituteForm from '../../components/Admin/EditInstituteForm';
import ConfirmDelete from '../../components/Admin/ConfirmDelete'
import AddProgram from '../../components/Admin/AddProgram'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const rowsPerPage = 10;
const AdminHomePage = () => {

  const navigate = useNavigate();
  const [institutes, setInstitutes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [openconfirmdelete, setOpenconfirmdelete] = useState(false);
  const [instituteID, setInstituteId] = useState(null)
  const [isAddInstituteModalOpen, setIsAddInstituteModalOpen] = useState(false);
  const [isEditInstituteModalOpen, setIsEditInstituteModalOpen] = useState(false);
  const [initialDataForEditInstitute, setInitialDataForEditInstitute] = useState({});
  const [isAddProgram, setIsAddProgram] = useState(false);
  const [search,setsearch]=useState('')

  const handleRowClick = (institute) => {
    const { institution_id, user_id } = institute;
    navigate('/admin/institute', { state: { institution_id, user_id } });
  };
  const fetchInstitutes = async (page) => {
    try {
      const responseData = await fetchInstitutesApi(
        { limit: rowsPerPage, page: page + 1 },
        { Authorization: sessionStorage.getItem('accessToken') }
      );

      setInstitutes(responseData.institute);
      setTotalPages(responseData.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstitutes(currentPage);

  }, [openconfirmdelete, isAddInstituteModalOpen, isEditInstituteModalOpen, isAddProgram]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
    fetchInstitutes(newPage);
  };

  const handleEditInstitute = (e, institute) => {
    e.stopPropagation();
    setInitialDataForEditInstitute(institute);
    setIsEditInstituteModalOpen(true);
  };
  const handleButtonClick = () => {
    navigate('/admin/category');
  };
  const searchhandle=((e)=>{
    // console.log(search);
    setsearch('')
  })

  return (
    <ThemeProvider theme={adminTheme}>
      <Header />
      <Container>
        <Box my={4}>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h4">Institutes</Typography>
            <div className='search-inputs'>
              <input value={search} type="text" onChange={e=>setsearch(e.target.value)} style={{ outline: 'none' }} placeholder="Search Institute"/>
              <div className='search-button'>
                <img onClick={searchhandle} src="/img/Search.svg" id="search-button" alt="search-button" />
              </div>
            </div>
          </div>

          <Button variant="contained" color="primary" onClick={() => setIsAddInstituteModalOpen(true)}>
            Add Institute
          </Button>
          <Button variant="contained" color="primary" onClick={() => setIsAddProgram(true)} style={{ marginLeft: '20px' }}>
            Add Program
          </Button>
          <Button onClick={handleButtonClick} variant="contained" color="primary" style={{ marginLeft: '20px' }}>
            Category
          </Button>

          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table size='small'>
              <TableBody>
                {institutes.map((institute) => (
                  <TableRow
                    key={institute.institution_id}
                    hover
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(institute)}
                  >
                    <TableCell>
                      <div>{institute.university_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.6)' }}>{institute.web_site}</div>
                    </TableCell>
                    <TableCell align="right" style={{ width: '100px' }}>
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => {
                          handleEditInstitute(e, institute);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right" style={{ width: '100px' }}>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click when clicking the button
                          setInstituteId(institute.user_id);
                          setOpenconfirmdelete(true)
                        }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[]}
              count={totalPages * rowsPerPage}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              labelDisplayedRows={({ from, to, count, page }) => `${page + 1} of ${Math.ceil(count / rowsPerPage)}`}
            />
          </TableContainer>

          {isAddProgram && <AddProgram isModalOpen={isAddProgram} setIsModalOpen={setIsAddProgram} />}
          {openconfirmdelete && (<ConfirmDelete isModalOpen={openconfirmdelete} institute={instituteID} setIsModalOpen={setOpenconfirmdelete} />)}
          {isAddInstituteModalOpen && (<AddInstituteForm isModalOpen={isAddInstituteModalOpen} setIsModalOpen={setIsAddInstituteModalOpen} />)}
          {isEditInstituteModalOpen && (<EditInstituteForm isModalOpen={isEditInstituteModalOpen} setIsModalOpen={setIsEditInstituteModalOpen} instituteID={initialDataForEditInstitute.user_id} />)}
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default AdminHomePage;

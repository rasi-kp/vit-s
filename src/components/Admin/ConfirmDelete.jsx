import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { createInstitute, deleteInstitute } from '../../services/ApiClientService';
import { toast } from 'react-toastify';

const ConfirmDelete = ({ isModalOpen, setIsModalOpen , institute}) => {

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleDeleteInstitute = async () => {
        const response=await deleteInstitute(institute, { Authorization: sessionStorage.getItem('accessToken') });
        if(response.status_code==200){
            toast.success("Successfully Delete Institute")
        }
        handleCloseModal()
      };

    return (
        <Modal open={isModalOpen} onClose={handleCloseModal} >
            <Box p={4.5} paddingLeft={7} paddingRight={7}
                bgcolor="background.paper"
                style={{ margin: '140px auto', maxWidth: '400px', 'border-radius': '15px'}}>
                <Typography variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
                    Are you sure you want to Delete this Institute ?
                </Typography>
                <Box mt={3} display="flex" justifyContent="space-around">
                    <Button onClick={handleCloseModal} variant="contained" color='primary'
                    style={{ width: '40%', backgroundColor: 'white', border: '1px solid yellow' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteInstitute} style={{width:'40%'}} variant="contained" color="primary">
                        Yes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmDelete;

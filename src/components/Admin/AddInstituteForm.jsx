import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { createInstitute } from '../../services/ApiClientService';
import { toast } from 'react-toastify';

const AddInstituteForm = ({ isModalOpen, setIsModalOpen }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    if(data.institutePhone && data.institutePhone.length !==10){
      toast.error('Phone number must be 10 digits');
      return
    }
    setIsLoading(true);
    const response = await createInstitute(
      {
        institute_name: data.instituteName,
        email: data.instituteEmail,
        phone: data.institutePhone,
        password: data.institutePassword
      },
      { Authorization: sessionStorage.getItem('accessToken') }
    );
    if (response.status_code == 200) {
      toast.success("Institute Added Successfully")
    }
    else{
      toast.error(response.error_info.message)
    }

    setIsLoading(false);
    handleCloseModal();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
    >
      <Box
        p={4}
        bgcolor="background.paper"
        style={{ margin: '50px auto', maxWidth: '500px' }}
      >
        <Typography variant="h6" component="h2">
          Add Institute
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Controller
              name="instituteName"
              control={control}
              defaultValue=""
              rules={{ required: 'Institute Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Institute Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.instituteName}
                  helperText={errors.instituteName?.message}
                  style={{ marginBottom: '20px', marginTop: '20px' }}
                  required
                />
              )}
            />
            <Controller
              name="instituteEmail"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  style={{ marginBottom: '20px' }}
                />
              )}
            />
            <Controller
              name="institutePhone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  style={{ marginBottom: '20px' }}
                />
              )}
            />
            <Controller
              name="institutePassword"
              control={control}
              defaultValue=""
              rules={{ minLength: { value: 6, message: 'Password should be at least 6 characters long' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  style={{ marginBottom: '20px' }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default AddInstituteForm;

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, CircularProgress, IconButton, FormControlLabel, Checkbox, RadioGroup, FormControl, FormLabel, Radio, MenuItem, InputLabel, Select } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Country, State, City } from 'country-state-city';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { deletelocationbyid, fetchInstitutesbyID, updateInstitute } from '../../services/ApiClientService';
import { toast, ToastContainer } from 'react-toastify';
const EditInstituteForm = ({ isModalOpen, setIsModalOpen, instituteID }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [institutes, setInstitutes] = useState({});
  const [locations, setLocations] = useState([]);
  const [emails, setEmails] = useState([]);
  const [contactNumbers, setContactNumbers] = useState([]);
  const [selectedstate, setselectedstate] = useState('')

  console.log(emails);

  const fetchInstitutes = async (instituteID) => {
    try {
      const responseData = await fetchInstitutesbyID(
        instituteID,
        { Authorization: sessionStorage.getItem('accessToken') }
      );
      setInstitutes(responseData);
      reset(responseData);
    } catch (error) {
      console.error('Error fetching institutes:', error);
    }
  };

  useEffect(() => {
    if (instituteID) {
      fetchInstitutes(instituteID);
    }
  }, [instituteID]);
  function transformLocations(locations, institute) {
    return locations.map(location => ({
      institute_city: location.city,
      institute_state: location.state,
      institute_country: location.country,
      institute_id: location.institute_id,
      location_id: location.location_id,
      institute_address_primary: location.city === institute // Set as primary if the cities match
    }));
  }

  useEffect(() => {
    if (institutes && institutes.contact_infos) {
      // Separate emails and phone numbers
      const emailsArray = institutes.contact_infos.filter(info => info.type === 'email').map(info => info.email_address);
      const phonesArray = institutes.contact_infos.filter(info => info.type === 'phone').map(info => info.phone_number);

      const transformedLocations = transformLocations(institutes.locations || [], institutes.city);
      // Setting the locations
      setLocations(transformedLocations);
      setEmails(emailsArray || ['']);
      setContactNumbers(phonesArray || []);
    }
  }, [institutes]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function stripIds(locations) {
    return locations.map(({ location_id, institute_id, ...rest }) => rest);
  }

  const onSubmit = async (data) => {
    if (locations.length == 0) {
      toast.error("location required")
      return
    }
    const strippedLocations = stripIds(locations);
    var instituteData = {
      institute_id: instituteID,
      institute_name: data.university_name,
      institute_phone: contactNumbers.filter(phone => phone && phone.trim() !== ''),
      institute_email: emails.filter(email => email && email.trim() !== ''),
      institute_type: data.instituteType || "Under Graduate",
      institute_about: data.about_us,
      institute_website: data.web_site,
      addresses: strippedLocations // Assuming `locations` is an array of address objects
    };
    console.log(instituteData);
    try {
      const response = await updateInstitute(instituteData, {
        Authorization: sessionStorage.getItem('accessToken')
      });
      if (response.status_code == 200) {
        toast.success("Institute updated successfully")
      } else {
        toast.error(response.error_info.message)
      }
    } catch (error) {
      toast.error("Error updating institute")
      console.error(error.message);
    }
    handleCloseModal();
  };

  const addLocation = () => {
    setLocations([...locations, { institute_country: 'India', institute_state: '', institute_city: '', institute_address_primary: locations.length === 0 }]);
  };

  const removeLocation = async (location, index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    const response = await deletelocationbyid(location.institute_id, location.location_id, {
      Authorization: sessionStorage.getItem('accessToken')
    });
    if (response.status_code == 200) {
      toast.success("Location deleted successfully")
    }
    else {
      toast.error("Error deleting location")
    }
    setLocations(updatedLocations.map((location, idx) => ({
      ...location,
      institute_address_primary: idx === 0 ? true : location.institute_address_primary,
    })));
  };

  const handleLocationChange = (index, field, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index][field] = value;
    setLocations(updatedLocations);
    if (field === 'institute_state') {
      const [isoCode, name] = value.split(',');
      setselectedstate(isoCode)
      updatedLocations[index][field] = name;
      setLocations(updatedLocations);
    } else {
      updatedLocations[index][field] = value;
      setLocations(updatedLocations);
    }
  };
  const handlePrimaryChange = (index) => {
    const updatedLocations = locations.map((location, idx) => ({
      ...location,
      institute_address_primary: idx === index,
    }));
    setLocations(updatedLocations);
  };

  const addEmail = () => {
    if (emails.length < 3) {
      setEmails([...emails, '']);
    }
  };

  const removeEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const addContactNumber = () => {
    if (contactNumbers.length < 3) {
      setContactNumbers([...contactNumbers, '']);
    }
  };

  const removeContactNumber = (index) => {
    const updatedContactNumbers = [...contactNumbers];
    updatedContactNumbers.splice(index, 1);
    setContactNumbers(updatedContactNumbers);
  };

  const handleContactNumberChange = (index, value) => {
    const updatedContactNumbers = [...contactNumbers];
    updatedContactNumbers[index] = value;
    setContactNumbers(updatedContactNumbers);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
    >
      <Box
        p={4}
        bgcolor="background.paper"
        style={{ margin: '30px auto', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <Typography variant="h6" component="h2">
          Edit Institute
        </Typography>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Controller
              name="university_name"
              control={control}
              defaultValue={institutes && institutes.university_name || ''}
              rules={{ required: 'Institute Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Institute Name"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: '20px', marginTop: '20px' }}
                  required
                />
              )}
            />
            <Controller
              name="about_us"
              control={control}
              defaultValue={institutes && institutes.about_us || ''}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="About Us"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  style={{ marginBottom: '20px' }}
                />
              )}
            />
            <Controller
              name="web_site"
              defaultValue={institutes.web_site || ''}
              control={control}
              rules={{ required: 'Website is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Website"
                  variant="outlined"
                  fullWidth
                  error={!!errors.website}
                  helperText={errors.website?.message}
                  style={{ marginBottom: '20px' }}
                  required
                />
              )}
            />
            {/* <Typography variant="body1" style={{ marginBottom: '5px' }}>institution_Type :</Typography> */}
            <Controller name="instituteType" control={control}
              defaultValue={institutes.institution_type}
              key={institutes.institution_type}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth required

                  style={{ marginBottom: '20px' }} >
                  <InputLabel> Institution Type</InputLabel>
                  <Select
                    {...field}
                    label="institution_Type">

                    <MenuItem value="Short Term Course" >Short Term Course</MenuItem>
                    <MenuItem value="Under Graduate">Under Graduate</MenuItem>
                    <MenuItem value="Post Graduate">Post Graduate</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Typography variant="body1">Locations</Typography>

            {locations.map((location, index) => (
              <Box key={index} mb={2}>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="primaryAddress"
                    value={locations.findIndex(loc => loc.institute_address_primary)}
                    onChange={(e) => handlePrimaryChange(parseInt(e.target.value))}
                  >
                    <FormControlLabel
                      value={index}
                      control={<Radio color="primary" />}
                      label="Primary Address"
                    />
                  </RadioGroup>
                </FormControl>
                <Controller
                  control={control}
                  name={`location_${index}_country`}
                  defaultValue={location.institute_country || 'India'}
                  render={({ field }) => (
                    <TextField
                      // select
                      {...field}
                      label="Country"
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(e) => {
                        handleLocationChange(index, 'institute_country', e.target.value);
                        field.onChange(e); // Ensure the Controller's field value is updated
                      }}
                      style={{ marginBottom: '10px' }}
                    >
                      <option value=""></option>
                      {/* {Country.getAllCountries().map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))} */}
                    </TextField>
                  )}
                />

                <Controller
                  control={control}
                  name={`location_${index}_state`}
                  // defaultValue={location.institute_state}
                  // key={location.institute_state}
                  render={({ field }) => (
                    <TextField
                      select
                      {...field}
                      label={location.institute_state || 'State'}
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(e) => {
                        handleLocationChange(index, 'institute_state', e.target.value)
                        field.onChange(e);
                      }}
                      style={{ marginBottom: '10px' }}
                    >
                      <option value=""></option>
                      {State.getStatesOfCountry("IN").map((state) => (
                        <option key={state.isoCode} value={`${state.isoCode},${state.name}`}>
                          {state.name}
                        </option>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  control={control}
                  name={`location_${index}_city`}
                  // defaultValue={location.institute_city || ''}
                  render={({ field }) => (
                    <TextField
                      select
                      {...field}
                      label={location.institute_city || 'City'}
                      variant="outlined"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                      onChange={(e) => {
                        handleLocationChange(index, 'institute_city', e.target.value)
                        field.onChange(e);
                      }}
                      style={{ marginBottom: '10px' }}
                    >
                      <option value=""></option>
                      {City.getCitiesOfState('IN', selectedstate).map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </TextField>
                  )}
                />

                {index > 0 && (
                  <IconButton onClick={() => removeLocation(location, index)} style={{ marginLeft: '10px' }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}

            <Button onClick={addLocation} variant="outlined" startIcon={<AddIcon />}>
              Add Location
            </Button>
            <Typography variant="body1" style={{ marginTop: '20px' }}>Contact Emails</Typography>
            {emails.map((email, index) => (
              <Box key={index} mb={2} display="flex" alignItems="center">
                <TextField
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  label={`Email ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: '10px' }}
                />
                {index > 0 && (
                  <IconButton onClick={() => removeEmail(index)} style={{ marginLeft: '10px' }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={addEmail} variant="outlined" startIcon={<AddIcon />}>
              Add Email
            </Button>
            <Typography variant="body1" style={{ marginTop: '20px' }}>Contact Numbers</Typography>
            {contactNumbers.map((number, index) => (
              <Box key={index} mb={2} display="flex" alignItems="center">
                <TextField
                  value={number}
                  onChange={(e) => handleContactNumberChange(index, e.target.value)}
                  label={`Contact Number ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: '10px' }}
                />
                {index > 0 && (
                  <IconButton onClick={() => removeContactNumber(index)} style={{ marginLeft: '10px' }}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={addContactNumber} variant="outlined" startIcon={<AddIcon />}>
              Add Contact Number
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Save
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default EditInstituteForm;

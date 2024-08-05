import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Checkbox, Container, IconButton, Modal, Switch, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import adminTheme from '../../themes/adminTheme';
import { addcategory, allcategory, deletecategory } from '../../services/ApiClientService';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';

const AddCategory = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [page, setPage] = useState(1);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [status, setstatus] = useState(0)
    const [categoryToggle, setCategoryToggle] = useState({});

    const fetchCategory = async (page) => {
        try {
            const responseData = await allcategory(
                { limit: 10, offset: page },
                { Authorization: sessionStorage.getItem('accessToken') }
            );
            if (responseData.sub_categories) {
                setCategories((prevCategory) => [...prevCategory, ...responseData.sub_categories]);
                setTotalPages(responseData.total_pages);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setPage((prevPage) => prevPage + 1);
        }
    }, []);

    useEffect(() => {
        fetchCategory(page);
    }, [page, status]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleAddCategory = async () => {
        if (categoryName.trim() !== '') {
            try {
                const response = await addcategory(categoryName, {
                    Authorization: sessionStorage.getItem('accessToken')
                });
                console.log(response);
                if (response.status_code == 201) {
                    toast.success("successfully added new category")
                } else {
                    toast.error(response.error_info.message)
                }
                setCategoryName('');
                setstatus(status + 1)
            } catch (error) {
                console.error(error);
            }
        }
    };
    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await deletecategory(categoryId, {
                Authorization: sessionStorage.getItem('accessToken')
            });
            if (response.status_code == 200) {
                toast.success("successfully deleted category")
            }
            setCategories(categories.filter((category) => category.category_id !== categoryId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleChange = (categoryId) => {
        setCategoryToggle(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    return (
        <ThemeProvider theme={adminTheme}>
            <Container>
                <Box className='dup-body'>
                    <div className='dup-body-wrap' style={{ padding: '30px' }}>
                        <h1 style={{ fontWeight: 'bold' }}>Category</h1>
                        <hr style={{ marginTop: '12px' }} className='hr' />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField style={{ flex: 1, marginTop: '12px' }}
                                required
                                label="Enter new Category" variant="filled" value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <Button variant="contained" color="primary"
                                style={{ marginLeft: '30px', height: '56px', marginTop: '12px' }}
                                onClick={handleAddCategory}>
                                Add Category
                            </Button>
                        </div>
                        <hr style={{ marginTop: '12px' }} className='hr' />
                        <Box>
                            {categories.map((category) => (
                                <Box key={category.category_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                                    <span>{category.category_name}</span>
                                    <Box>

                                        <Switch
                                            checked={categoryToggle[category.category_id] || false}
                                            onChange={() => handleToggleChange(category.category_id)}
                                            inputProps={{ 'aria-label': 'toggle on/off' }}
                                        />
                                        <IconButton aria-label="delete"
                                            onClick={() => {
                                                setCategoryToDelete(category.category_id);
                                                setOpenConfirmDelete(true);
                                            }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </div>

                </Box>
                {openConfirmDelete && <Modal open={openConfirmDelete}
                    onClose={() => setOpenConfirmDelete(false)}>
                    <Box p={4.5} paddingLeft={7} paddingRight={7}
                        bgcolor="background.paper"
                        style={{ margin: '140px auto', maxWidth: '400px', borderRadius: '15px' }}>
                        <Typography variant="h6" component="h2" style={{ fontWeight: 'bold' }}>
                            Are you sure you want to delete this category?
                        </Typography>
                        <Box mt={3} display="flex" justifyContent="space-around">
                            <Button onClick={() => setOpenConfirmDelete(false)} variant="contained" color='primary'
                                style={{ width: '40%', backgroundColor: 'white', border: '1px solid yellow' }}>
                                Cancel
                            </Button>
                            <Button onClick={() => {
                                handleDeleteCategory(categoryToDelete);
                                setOpenConfirmDelete(false);
                            }} style={{ width: '40%' }} variant="contained" color="primary">
                                Yes
                            </Button>
                        </Box>
                    </Box>
                </Modal>}
            </Container>
            <ToastContainer />
        </ThemeProvider>
    );
};

export default AddCategory;

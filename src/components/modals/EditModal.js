import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext, useEffect } from 'react';
import { InstanceContext } from '../../context/InstanceContext';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ThemeProvider } from "@mui/material";
import { flushSync } from 'react-dom';

export default function EditModal(props) {
    const context = useContext(InstanceContext)

    useEffect(() => {
        !context.nameToEdit ? context.setIsNameValid(false) : context.setIsNameValid(true)
        !context.emailToEdit ? context.setIsEmailValid(false) : context.setIsEmailValid(true)
    }, [context.nameToEdit, context.emailToEdit])

    const handleClose = () => context.setOpenEdit(false);

    const handleChangeGender = (event) => {
        context.setGenderToEdit(event.target.value);
    }
    
    const handleChangeStatus = (event) => {
        context.setStatusToEdit(event.target.value);
    }

    const handleEditUserData = () => {
        if (context.nameToEdit && context.emailToEdit) {
            fetch(`${context.baseUrl}/${context.selectedUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer c47f5d9ba679e5918be59b7cebc4581acf0846777b72dffde5058897a8676f74"
                },
                body: JSON.stringify({
                    id: context.selectedUserId,
                    name: context.nameToEdit,
                    email: context.emailToEdit,
                    gender: context.genderToEdit,
                    status: context.statusToEdit
                })
            })
            .then(resp => {
                console.log(resp.ok)
                if(resp.ok === true) {
                    context.setIsEmailValidOnFetch(true)
                    context.instance.get(context.baseUrl)
                        .then(resp => {
                            flushSync(() => context.setUsersData(prev => resp.data))
                            flushSync(() => context.setModifyedUsersData(prev => resp.data))
                        }).catch(error => console.error(error))
                    handleClose()
                } else {
                    context.setIsEmailValidOnFetch(false)
                }

            })
            .catch(error => console.error(error))
        }
    }

    return <ThemeProvider theme={context.theme}>
        <Modal
            id='edit-modal'
            open={context.openEdit}
            onClose={handleClose}
            aria-labelledby="edit-modal-label"
            aria-describedby="edit-modal-description"
        >
            <Box sx={context.style} id='edit-modal-box'>
                <Typography id="edit-modal-title" variant="h6" component="h2">
                    Edit data of user with ID {context.selectedUserId}
                </Typography>
                <Stack direction='column' spacing={2}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, minWidth: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField defaultValue={context.nameToEdit} id="name-to-edit-input" label="Name" variant="filled" 
                            onChange={event => {
                                context.setNameToEdit(event.target.value)
                            }}
                        />
                        {!context.isNameValid ? <p id='validating-string-name'>Please enter a name!</p> : null}
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, minWidth: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField defaultValue={context.emailToEdit} id="email-to-edit-input" label="Email" variant="filled" 
                            onChange={event => context.setEmailToEdit(event.target.value)}
                        />
                        {!context.isEmailValid ? <p id='validating-string-email'>Please enter an email!</p> : null}
                        {!context.isEmailValidOnFetch ? <p id='validating-string-email-on-fetch'>Error: please enter a correct email!</p> : null}
                    </Box>
                    <Stack direction='row' spacing={2}>
                        <FormControl sx={{ maxWidth: '44%' }} fullWidth>
                            <InputLabel id="gender-edit-label">Gender</InputLabel>
                            <Select
                                labelId="gender-edit-label"
                                id="gender-edit"
                                value={context.genderToEdit}
                                label="Gender"
                                onChange={handleChangeGender}
                            >
                                <MenuItem value='male'>Male</MenuItem>
                                <MenuItem value='female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl id='edit-status-select' sx={{ maxWidth: '44%' }} fullWidth>
                            <InputLabel id="status-edit-label">Status</InputLabel>
                            <Select
                                labelId="status-edit-label"
                                id="status-edit"
                                value={context.statusToEdit}
                                label="Status"
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='inactive'>inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack id='edit-modal-buttons-stack' direction='row' spacing={2}>
                        <Button className='modal-button' variant="contained" onClick={handleEditUserData}>Confirm</Button>
                        <Button className='modal-button' variant="contained" onClick={handleClose}>Cancel</Button>
                    </Stack>
                </Stack>
                    
            </Box>
        </Modal>
    </ThemeProvider>
}
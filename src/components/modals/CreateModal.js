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

export default function CreateModal() {
    const context = useContext(InstanceContext)

    useEffect(() => {
        console.log(context.newName)
        console.log(context.newEmail)
        console.log(context.newGender)
        console.log(context.newStatus)
        context.newName ? context.setIsNameValid(true) : context.setIsNameValid(false)
        context.newEmail ? context.setIsEmailValid(true) : context.setIsEmailValid(false)
    }, [context.newName, context.newEmail, context.newGender, context.newStatus])

    const handleClose = () => context.setOpenCreate(false);

    const handleCreateUserData = () => {
        if (context.newName && context.newEmail && context.newGender && context.newStatus) {
            fetch(context.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer c47f5d9ba679e5918be59b7cebc4581acf0846777b72dffde5058897a8676f74"
                },
                body: JSON.stringify({
                    name: context.newName,
                    email: context.newEmail,
                    gender: context.newGender,
                    status: context.newStatus
                })
            })
                .then(resp => {
                    console.log(resp)
                    if (resp.ok === true) {
                        context.setIsEmailValidOnFetch(true)
                        context.instance.get(context.baseUrl)
                            .then(resp => {
                                flushSync(() => context.setUsersData(prev => resp.data))
                                flushSync(() => context.setModifyedUsersData(prev => resp.data))
                            })
                            .catch(error => console.error(error))
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
            id='create-modal'
            open={context.openCreate}
            onClose={handleClose}
            aria-labelledby="create-modal-label"
            aria-describedby="create-modal-description"
        >
            <Box sx={context.style} id='create-modal-box'>
                <Typography id="create-modal-title" variant="h6" component="h2">
                    Create new user
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
                        <TextField id="create-new-name-input" label="Name" variant="filled"
                            onChange={event => context.setNewName(event.target.value)}
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
                        <TextField id="create-new-email-input" label="Email" variant="filled"
                            onChange={event => context.setNewEmail(event.target.value)}
                        />
                        {!context.isEmailValid ? <p id='validating-string-email'>Please enter an email!</p> : null}
                        {!context.isEmailValidOnFetch ? <p id='validating-string-email-on-fetch'>Error: please enter a correct email!</p> : null}
                    </Box>
                    <Stack direction='row' spacing={2}>
                        <FormControl sx={{ maxWidth: '44%' }} fullWidth>
                            <InputLabel id="gender-create-label">Gender</InputLabel>
                            <Select
                                labelId="gender-create-label"
                                id="gender-create"
                                value={context.newGender}
                                label="Gender"
                                onChange={event => {
                                    context.setIsGenderSelected(true)
                                    context.setNewGender(event.target.value)
                                }}
                            >
                                <MenuItem value='male'>Male</MenuItem>
                                <MenuItem value='female'>Female</MenuItem>
                            </Select>
                            {!context.isGenderSelected ? <p id='validating-select-gender'>Please select a gender!</p> : null}
                        </FormControl>
                        <FormControl id='create-status-select' sx={{ maxWidth: '44%' }} fullWidth>
                            <InputLabel id="status-create-label">Status</InputLabel>
                            <Select
                                labelId="status-create-label"
                                id="status-create"
                                value={context.newStatus}
                                label="Status"
                                onChange={event => {
                                    context.setIsStatusSelected(true)
                                    context.setNewStatus(event.target.value)
                                }}
                            >
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value='inactive'>inactive</MenuItem>
                            </Select>
                            {!context.isStatusSelected ? <p id='validating-select-status'>Please select a status!</p> : null}
                        </FormControl>
                    </Stack>
                    <Stack id='create-modal-buttons-stack' direction='row' spacing={2}>
                        <Button className='modal-button' variant="contained" onClick={handleCreateUserData}>Confirm</Button>
                        <Button className='modal-button' variant="contained" onClick={handleClose}>Cancel</Button>
                    </Stack>
                </Stack>

            </Box>
        </Modal>
    </ThemeProvider>
}
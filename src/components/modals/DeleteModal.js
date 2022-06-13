import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { InstanceContext } from '../../context/InstanceContext';
import { Stack } from '@mui/material';

export default function DeleteModal(props) {
    const context = useContext(InstanceContext)
    
    const handleClose = () => context.setOpenDelete(false);

    function handleDelete() {
        context.instance.delete(`${context.baseUrl}/${context.selectedUserId}`)
        .then(resp => {
            if (resp.statusText === 'No Content') {
                console.log('Success')
                context.setModifyedUsersData(context.modifyedUsersData.filter(user => {
                    if (user.id !== context.selectedUserId) {
                        return user
                    }
                }))
                context.setUsersData(context.usersData.filter(user => {
                    if (user.id !== context.selectedUserId) {
                        return user
                    }
                }))      
            } else {
                console.log('Something went wrong ') 
            }      
        })
        .catch(error => console.error(error))
    }

    return <div>
        <Modal
            id='delete-modal'
            open={context.openDelete}
            onClose={handleClose}
            aria-labelledby="delete-modal-label"
            aria-describedby="delete-modal-description"
        >
            <Box sx={context.style} id='delete-modal-box'>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                    Do you really want to delete user with ID {context.selectedUserId}?
                </Typography>
                <Stack id='delete-modal-buttons-stack' direction='row' spacing={2}>
                    <Button className='modal-button' variant="contained" onClick={() => {
                        handleDelete()
                        handleClose()
                    }}>Yes</Button>
                    <Button className='modal-button' variant="contained" onClick={handleClose}>No</Button>
                </Stack>
            </Box>
        </Modal>
    </div>
}
import clsx from "clsx"
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CreateModal from "./modals/CreateModal";
import { useContext } from "react";
import { InstanceContext } from "../context/InstanceContext";

export default function Navbar(props) {
    const classes = clsx({
        navbar: true
    })

    const context = useContext(InstanceContext)

    const handleOpenCreate = () => {
        context.setNewName('')
        context.setNewEmail('')
        context.setNewGender('')
        context.setNewStatus('')
        context.setIsEmailValid(false)
        context.setIsNameValid(false)
        context.setIsGenderSelected(false)
        context.setIsStatusSelected(false)
        context.setIsEmailValidOnFetch(true)
        context.setOpenCreate(true)
    }

    return <>
        <nav className={classes}>
            <Stack id='nav-stack' direction="row" spacing={2}>
                <SummarizeOutlinedIcon id='logo' />
                <p id="nav-name">Users list</p>
                <Button id="add-user-btn" variant="outlined" onClick={handleOpenCreate}>Add new user</Button>
            </Stack>
            <CreateModal />
        </nav>
    </>
}
import { createContext, useState } from "react";
import axios from "axios";
import { createTheme } from "@mui/material";

const InstanceContext = createContext()

function InstanceProvider(props) {
    const [usersData, setUsersData] = useState()
    const [modifyedUsersData, setModifyedUsersData] = useState()
    const [gender, setGender] = useState('')
    const [status, setStatus] = useState('');
    const [selectedUserId, setSelectedUserId] = useState()
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [genderToEdit, setGenderToEdit] = useState('');
    const [statusToEdit, setStatusToEdit] = useState('');
    const [nameToEdit, setNameToEdit] = useState('')
    const [emailToEdit, setEmailToEdit] = useState('')
    const [isNameValid, setIsNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isEmailValidOnFetch, setIsEmailValidOnFetch] = useState(true)
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newGender, setNewGender] = useState('')
    const [newStatus, setNewStatus] = useState('')
    const [isGenderSelected, setIsGenderSelected] = useState(false)
    const [isStatusSelected, setIsStatusSelected] = useState(false)

    const theme = createTheme({
        palette: {
            primary: {
                main: '#000a12',
            },
            secondary: {
                main: '#ffeb3b',
            },
        },
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#ffff72',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxWidth: '80%'
    };

    const instance = axios.create({
        headers: {
            "Authorization": "Bearer c47f5d9ba679e5918be59b7cebc4581acf0846777b72dffde5058897a8676f74"
        }
    })

    const [filter, setFilter] = useState({
        gender: false,
        status: false
    })

    const baseUrl = 'https://gorest.co.in/public/v2/users'

    const value = {
        isGenderSelected,
        setIsGenderSelected,
        isStatusSelected,
        setIsStatusSelected,
        newName,
        setNewName,
        newEmail,
        setNewEmail,
        newGender,
        setNewGender,
        newStatus,
        setNewStatus,
        isEmailValidOnFetch,
        setIsEmailValidOnFetch,
        isNameValid,
        setIsNameValid,
        isEmailValid,
        setIsEmailValid,
        theme,
        nameToEdit,
        setNameToEdit,
        emailToEdit,
        setEmailToEdit,
        genderToEdit,
        setGenderToEdit,
        statusToEdit,
        setStatusToEdit,
        style,
        openEdit,
        setOpenEdit,
        openCreate,
        setOpenCreate,
        openDelete,
        setOpenDelete,
        selectedUserId,
        setSelectedUserId,
        status,
        setStatus,
        gender,
        setGender,
        filter,
        setFilter,
        usersData,
        setUsersData,
        modifyedUsersData,
        setModifyedUsersData,
        baseUrl,
        instance
    }

    return <InstanceContext.Provider value={value}>{props.children}</InstanceContext.Provider>
}

export {InstanceContext, InstanceProvider}
import { useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { InstanceContext } from '../context/InstanceContext';

export default function GenderSelect(props) {
    const context = useContext(InstanceContext)

    const handleChange = (event) => {
        context.setGender(event.target.value)
        context.setFilter({ ...context.filter, gender: event.target.value})
    };

    return <FormControl id='gender-select-form-control' variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel className='select-input' id="gender-select-label">Gender</InputLabel>
        <Select
            labelId="gender-select"
            id="gender-select"
            value={context.gender}
            onChange={handleChange}
            label="Gender"
        >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
        </Select>
    </FormControl>
}
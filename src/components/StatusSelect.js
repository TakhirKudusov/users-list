import { useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { InstanceContext } from '../context/InstanceContext';

export default function StatusSelect(props) {
    const context = useContext(InstanceContext)

    const handleChange = (event) => {
        context.setStatus(event.target.value);
        context.setFilter({ ...context.filter, status: event.target.value }) 
    };

    return <FormControl id='status-select-form-control' variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <InputLabel className='select-input' id="status-select-label">Status</InputLabel>
        <Select
            labelId="status-select"
            id="status-select"
            value={context.status}
            onChange={handleChange}
            label="Status"
        >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
        </Select>
    </FormControl>
}
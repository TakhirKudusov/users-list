import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import { useSetUsersData } from '../custom hooks/useSetUsersData';
import { Stack } from '@mui/material';

export default function Search(props) {
    const [searchOption, setSearchOption] = useState('name')

    const filter = useSetUsersData(searchOption)

    return <>
        <Stack id='search-stack' direction="row" spacing={1}>
            <Box id='search-option-box' sx={{ maxWidth: 100 }}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="search-option">
                        Search option
                    </InputLabel>
                    <NativeSelect
                        defaultValue={'name'}
                        inputProps={{
                            name: 'option',
                            id: 'search-option',
                        }}
                        onChange={event => setSearchOption(event.target.value)}
                    >
                        <option value='name'>By name</option>
                        <option value='email'>By email</option>
                    </NativeSelect>
                </FormControl>
            </Box>
            <Box
                id='search-input-box'
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, maxWidth: '15ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="search-input" label="Search" variant="standard"
                    onChange={event => {
                        filter(event)
                    }}
                />
            </Box>
        </Stack>
        
    </>
    
}
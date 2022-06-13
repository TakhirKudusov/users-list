import Search from "./Search";
import { useContext } from "react";
import clsx from "clsx"
import { Stack } from "@mui/material"
import { InstanceContext } from "../context/InstanceContext";
import GenderSelect from "./GenderSelect";
import StatusSelect from "./StatusSelect";
import Button from '@mui/material/Button';
import { ThemeProvider } from "@mui/material";

export default function Menu(props) {
    const context = useContext(InstanceContext)

    const classes = clsx({
        menu: true
    })

    return <div className={classes}>
        <ThemeProvider id='theme-provider' theme={context.theme}>
            <Search id='search-option-element' />
            <Stack id='select-stack' direction="row" spacing={1}>
                <GenderSelect />
                <StatusSelect />
            </Stack>  
                <Button id="clear-btn" variant="contained" onClick={() => {
                    console.log('cklicked')
                    context.setFilter({
                        gender: false,
                        status: false
                    })
                    context.setGender('')
                    context.setStatus('')
                }} >Clear filters</Button>
        </ThemeProvider>
    </div>
}
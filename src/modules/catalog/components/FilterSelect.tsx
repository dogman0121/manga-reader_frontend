import { Box, MenuItem, SelectChangeEvent, styled, Typography, useTheme } from "@mui/material";
import FormSelect, { FormSelectProps } from "../../../features/form/components/FormSelect";
import CancelIcon from "@mui/icons-material/Cancel"
import useFilter from "../hooks/useFilter";
import FormChip from "../../../features/form/components/FormChip";

const MySelect = styled(FormSelect)(() => ({
    '& .InputTitle': {
        lineHeight: "16px"
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: "transparent",
        '& fieldset': {
            borderRadius: "12px",
        },
    },
    "& input": {
        fontSize: "14px",
        lineHeight: "21px",
        padding: "10px 0",
        height: "auto"
    }
}));


type FilterSelectProps = {
    name: string,
    options: {id: number, name: string}[],
} & Omit<FormSelectProps, "children">;

export default function FilterSelect({name, options, ...props}: FilterSelectProps) {
    const {value, setValue} = useFilter(name);

    const theme = useTheme()

    const handleChange = (event: SelectChangeEvent<any>, _child: React.ReactNode) => {
        const {
            target: {value}
        } = event;

        setValue(typeof value === 'string' ? value.split(',') : value);
    } 

    return (
        <MySelect
            defaultValue={[]}
            value={value}
            onChange={handleChange}
            displayEmpty={true}
            renderValue={(selected: any) => (
                <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(1)}}
                >
                    {selected.length !== 0 ?
                        <>
                            {selected.map((value: string) => (
                                <FormChip 
                                    key={value} 
                                    label={options.find((item) => item.id == parseInt(value))?.name}
                                    deleteIcon={
                                        <CancelIcon
                                            sx={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                            onMouseDown={(event) => {event.stopPropagation(); event.preventDefault()}}
                                        />
                                    }
                                    onDelete={() => setValue(selected.filter((f: string) => f != value))}
                                />
                            ))}
                        </>
                        :
                        <Typography color="darkgray">Выберите значение</Typography>
                    }
                </Box>
            )}
            {...props}
        >
            {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
            ))}
        </MySelect>
    )
};
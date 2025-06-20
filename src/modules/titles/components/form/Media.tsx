import { Box, Typography } from "@mui/material"
import { Controller, useFormContext } from "react-hook-form";
import FormFileInput from "../../../../features/form/components/FormFileInput";
import FormMultipleFilesInput from "../../../../features/form/components/FormMultipleFilesInput";
import FormField from "../../../../features/form/components/FormField";
import { FormFilePreview } from "../../../../features/form/components/FormFilePreview";
import FormFile from "../../../../features/form/types/FormFile";
import FormFileSelect from "../../../../features/form/components/FormFileSelect";


function Media() {
    const {control, watch} = useFormContext();

    return (
        <>  
            <Controller 
                name="mainPoster"
                control={control}
                render={({field: {onChange, value}}) => (
                    <Box>
                        <Typography>Главный постер</Typography>
                        <FormField
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                                mt: "5px",
                                gap: "15px",
                                flexDirection: "row"
                            }}
                        >
                            <FormFileSelect
                                form="rectangle"
                                width="100%"
                                aspectRatio="2/3"
                                files={watch("posters")}
                                onChange={onChange}
                                value={value}
                            />
                            <FormFilePreview
                                onDelete={() => {onChange(undefined)}}
                                width="100%"
                                aspectRatio="2/3"
                                file={value}
                            />
                        </FormField>
                    </Box>
                    
                )}
            />
            <Controller 
                name="background"
                control={control}
                render={({field: {onChange, value}}) => (
                    <Box>
                        <Typography>Обложка</Typography>
                        <FormField
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                                mt: "5px",
                                gap: "15px",
                                flexDirection: "row"
                            }}
                        >
                            <FormFileInput
                                form="rectangle"
                                width="100%"
                                aspectRatio="2/3"
                                onChange={(f: FormFile[]) => {onChange(f[0])}}
                                value={value}
                                dropzoneOptions={{maxFiles: 1}}
                            />
                            <FormFilePreview
                                onDelete={() => {onChange(undefined)}}
                                width="100%"
                                aspectRatio="2/3"
                                file={value}
                            />
                        </FormField>
                    </Box>
                    
                )}
            />
            <Controller 
                name="posters"
                control={control}
                render={({field: {value, onChange}}) => (
                    <FormMultipleFilesInput 
                        title="Постеры"
                        onChange={onChange}
                        defaultValue={value}
                    />
                )}
            />
        </>
    )
}

export default Media;
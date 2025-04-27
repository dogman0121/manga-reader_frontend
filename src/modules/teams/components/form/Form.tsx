import { useForm, Controller } from 'react-hook-form'
import TextField from '../../../../components/ui/TextField'

interface TeamFormProps {
    id: number,
    name: string,
    vkLink?: string,
    tgLink?: string,
    discordLink?: string,
    poster?: File
}


export default function Form() {
    const {control} = useForm<TeamFormProps>();

    return (
        <form>
            <Controller
                name='name' 
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                    />  
                )}
            />
        </form>
    )
}
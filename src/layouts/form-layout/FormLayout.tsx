import { Outlet } from "react-router-dom"
import FormProvider from "../../features/form/components/FormProvider";


function FormLayout() {
    return (
        <FormProvider>
            <Outlet />
        </FormProvider>
    )
}

export default FormLayout;
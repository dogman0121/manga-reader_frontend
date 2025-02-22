import Auth from "./Auth"

export default function AuthPage({ section }: {section: string}) {
    const onAuth = () => {
        document.location.href="https://kanwoo.ru";
    }
    
    return (
        <Auth 
            section={section}
            onAuth={onAuth}
        />
    )
}
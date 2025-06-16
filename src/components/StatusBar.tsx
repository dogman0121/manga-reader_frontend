export default function StatusBar({color}: {color: string}) {
    return (
        <>  
            <meta name="theme-color" content={color}/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        </>
    )
}
import { SvgIcon, SvgIconProps } from "@mui/material"

export default function LogoIcon({sx, ...props}: SvgIconProps) {
    return (
        <SvgIcon 
            viewBox="0 0 96 96"
            sx={{
                width: "32px",
                height: "32px",
                ...sx
            }}
            {...props}
        >
            <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                fill="var(--icon)" stroke="none">
                <path d="M135 888 c-3 -7 -4 -195 -3 -418 l3 -405 85 0 85 0 3 131 3 130 43
                43 44 43 127 -176 127 -176 84 0 c69 0 84 3 84 16 0 8 -72 115 -160 236 l-161
                221 29 31 c133 143 282 318 277 326 -3 6 -46 10 -94 10 l-87 0 -155 -171 -154
                -171 -5 169 -5 168 -83 3 c-60 2 -84 -1 -87 -10z"/>
            </g>
        </SvgIcon>
    )
}
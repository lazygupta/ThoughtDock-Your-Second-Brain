import { ReactElement } from "react";

type Variants = "primary" | "secondary"
interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}

const variantStyles = {
    "primary": "bg-purple-400 text-white ",
    "secondary": "bg-purple-300 text-purple-500"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

const defaultStyles = "rounded-md flex"

export const Button = (props: ButtonProps) => {
    return <button className={` ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} flex items-center rounded-xl`} >
        {props.startIcon ? <div className="pr-2 flex items-center">{props.startIcon}</div> : null} <span>{props.text}</span>
    </button>
}
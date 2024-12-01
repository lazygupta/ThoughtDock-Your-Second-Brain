import { IconProps, iconSizeVariants } from ".";

export const YouTubeIcon = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={iconSizeVariants[props.size] }
            stroke="currentColor"
            stroke-width="2" 
        >
            <path d="M23.498 6.186a2.99 2.99 0 0 0-2.11-2.11C19.327 3.5 12 3.5 12 3.5s-7.327 0-9.388.576a2.99 2.99 0 0 0-2.11 2.11C0 8.248 0 12 0 12s0 3.752.502 5.814c.262 1.04 1.07 1.849 2.11 2.11C4.673 20.5 12 20.5 12 20.5s7.327 0 9.388-.576a2.99 2.99 0 0 0 2.11-2.11C24 15.752 24 12 24 12s0-3.752-.502-5.814ZM9.75 15.33V8.67L15.5 12l-5.75 3.33Z" />
        </svg>
    );
};

interface ButtonProps {
    text: string |  React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isSmall?: boolean;
}

function Button({ text, onClick, disabled = false, isSmall }: ButtonProps) {
    return (
        <button
            className={`flex border-2 justify-center items-center
            cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
            ${isSmall ? "w-6 h-6 border-none ml-3" : "w-52 h-12"}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;
interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

function Button({ text, onClick, disabled = false }: ButtonProps) {
    return (
        <button
            className="flex border-2 w-52 h-12 justify-center items-center
            cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default Button;
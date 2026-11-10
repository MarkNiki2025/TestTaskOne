import { Link, type To} from "react-router";

interface ButtonProps {
    text: string;
    link: To;
}

function Button ({text,link}:ButtonProps) {
    return (
        <Link to={link} className="flex border-2 w-52 h-12 justify-center items-center">
            {text}
        </Link>
    )
}

export default Button
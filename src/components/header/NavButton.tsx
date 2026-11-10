import { NavLink, type To} from "react-router";
import Button from "../ui/Button";

interface NavButtonProps {
    text: string;
    link: To;
}

function NavButton ({text,link}:NavButtonProps) {
    return (
        <NavLink to={link} className={({ isActive }) =>
                `${isActive ? "bg-gray-300" : "bg-white"}`
            }>
            <Button text = {text}/>
        </NavLink>
    )
}

export default NavButton
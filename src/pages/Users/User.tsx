import { useState } from "react";
import Header from "../../components/header/Header";
import Modal from "../../components/ui/Modal";

function User() {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    return (
        <>
            <Header />
            <div className="border-2">
                <h2 className="font-karla font-medium text-[24px] tracking-[6px] align-middle text-center">
                    Users
                </h2>
                {isOpen && 
                     <div className="w-full flex justify-center">
                        <Modal onCancel= {handleClose}/>
                    </div>
                }
            </div>
            
            
        </>

    )
}

export default User
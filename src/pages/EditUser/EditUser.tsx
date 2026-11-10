import Button from "../../components/ui/Button";
import Header from "../../components/header/Header";
import Select from "../../components/ui/Select";
import {users} from "../../data/users"
import type {ISelectOption} from "../../types/select"
import { getUniqueOptions } from "../../utility/utility";
import Textarea from "../../components/ui/TextAria";
import { useState } from "react";

function EditUSer() {
    const [userName,setUserName] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        department: "",
        status: "",
    });
    const selectedUser = users.find((i) => i.name === userName);

    const initialData = {
        name: selectedUser?.name ?? "",
        country: selectedUser?.country.name ?? "",
        department: selectedUser?.department.name ?? "",
        status: selectedUser?.status.name ?? "",
    };

    const isChanged = JSON.stringify(formData) !== JSON.stringify(initialData);
    const userSelect: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.name,
        value: user.name,
    }))
    );

    const userSelectCountry: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.country.name,
        value: user.country.value,
    }))
    );

    const userSelectDepartment: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.department.name,
        value: user.department.value,
    }))
    );

    const userSelectStatus: ISelectOption[] = getUniqueOptions(
    users.map((user) => ({
        name: user.status.name,
        value: user.status.value,
    }))
    );

    function handleUser(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedUserData = users.find(
            (user) => user.name === e.target.value
        );
        setUserName(e.target.value);
        setFormData({
            name: selectedUserData?.name ?? "",
            country: selectedUserData?.country.name ?? "",
            department: selectedUserData?.department.name ?? "",
            status: selectedUserData?.status.name ?? "",
        })
    }

    function handleSave() {
        const user = users.find((i) => i.name === userName);
        console.log(users);

        if (!user) return;

        const country = users
            .map((i) => i.country)
            .find((i) => i.name === formData.country);

        const department = users
            .map((i) => i.department)
            .find((i) => i.name === formData.department);

        const status = users
            .map((i) => i.status)
            .find((i) => i.name === formData.status);

        if (!country || !department || !status) return;
        console.log("nice")
        user.name = formData.name;
        user.country = country;
        user.department = department;
        user.status = status;

        console.log(user);
    }

    function handleUndo() {
        console.log(initialData)
        setFormData({
            name: initialData?.name ?? "",
            country: initialData?.country ?? "",
            department: initialData?.department ?? "",
            status: initialData?.status ?? "",
        })
    }
    return (
        <>
            <Header />
            <section className="py-8 px-20">
                <h2 className="font-karla font-medium text-[24px] tracking-[6px] align-middle text-center " >Edit User</h2>
                <div>
                    <div>
                        <Select label="User" options={userSelect} value={userName} onChange={handleUser}/>
                    </div>
                </div>
                <h3 className="text-2xl my-5">
                    User Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <Textarea label="Full name" value={formData.name} 
                        onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                    />
                    <Select label="Country" options={userSelectCountry}  value={formData.country ?? ""} 
                        onChange={(e) => setFormData({
                                ...formData,
                                country: e.target.value
                        })}/>
                    <Select label="Departament" options={userSelectDepartment} value={formData?.department ?? ""}
                    onChange={(e) => setFormData({
                                ...formData,
                                department: e.target.value
                        })}/>
                    <Select label="Status" options={userSelectStatus} value={formData?.status ?? ""}
                    onChange={(e) => {
                        setFormData({
                                ...formData,
                                status: e.target.value
                                
                        })}}
                    />
                </div>
                <div className="flex gap-3 my-5 justify-end">
                    {isChanged && (
                        <div>
                            <Button text="Undo" onClick={handleUndo} />
                        </div>
                    )}
                    <Button text="Save" onClick = {handleSave} disabled={!isChanged}/>
                </div>
            </section>
        </>
    )
}

export default EditUSer

import Button from "../../components/ui/Button";
import Header from "../../components/header/Header";
import Select from "../../components/ui/Select";
import { users } from "../../data/users";
import Textarea from "../../components/ui/TextAria";
import { useState } from "react";
import {
  userSelectCountry,
  userSelectDepartment,
  userSelectStatus,
  userSelect,
} from "../../data/selection";
function EditUSer() {
    const [userName, setUserName] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        department: "",
        status: "",
    });

    const selectedUser = users.find((i) => i.name === userName);

    const initialData = {
        name: selectedUser?.name ?? "",
        country: selectedUser?.country.value ?? "",
        department: selectedUser?.department.value ?? "",
        status: selectedUser?.status.value ?? "",
    };

    const isChanged =
        JSON.stringify(formData) !== JSON.stringify(initialData);

    function handleUser(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedUserData = users.find(
            (user) => user.name === e.target.value
        );

        setUserName(e.target.value);

        setFormData({
            name: selectedUserData?.name ?? "",
            country: selectedUserData?.country.value ?? "",
            department: selectedUserData?.department.value ?? "",
            status: selectedUserData?.status.value ?? "",
        });
    }

    function handleSave() {
        const user = users.find((i) => i.name === userName);

        if (!user) return;

        const country = users
            .map((i) => i.country)
            .find((i) => i.value === formData.country);

        const department = users
            .map((i) => i.department)
            .find((i) => i.value === formData.department);

        const status = users
            .map((i) => i.status)
            .find((i) => i.value === formData.status);

        if (!country || !department || !status) return;

        user.name = formData.name.trim();
        user.country = country;
        user.department = department;
        user.status = status;

        setUserName(user.name);

        console.log(user);
    }

    function handleUndo() {
        setFormData(initialData);
    }

    return (
        <>
            <Header />

            <section className="py-8 px-20 border-2 mx-8">
                <h2 className="font-karla font-medium text-[24px] tracking-[6px] align-middle text-center">
                    Edit User
                </h2>

                <div>
                    <Select
                        label="User"
                        options={userSelect}
                        value={userName}
                        onChange={handleUser}
                    />
                </div>

                <h3 className="text-2xl my-5">
                    User Information
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    <Textarea
                        label="Full name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <Select
                        label="Country"
                        options={userSelectCountry}
                        value={formData.country}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                country: e.target.value,
                            })
                        }
                    />

                    <Select
                        label="Department"
                        options={userSelectDepartment}
                        value={formData.department}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                department: e.target.value,
                            })
                        }
                    />

                    <Select
                        label="Status"
                        options={userSelectStatus}
                        value={formData.status}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                status: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="flex gap-3 my-5 justify-end">
                    {isChanged && (
                        <div>
                            <Button
                                text="Undo"
                                onClick={handleUndo}
                            />
                        </div>
                    )}

                    <Button
                        text="Save"
                        onClick={handleSave}
                        disabled={!isChanged}
                    />
                </div>
            </section>
        </>
    );
}

export default EditUSer;

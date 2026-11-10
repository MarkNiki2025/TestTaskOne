
import Button from "../../components/ui/Button";
import Header from "../../components/header/Header";
import Select from "../../components/ui/Select";
import Textarea from "../../components/ui/TextAria";
import { useState } from "react";
import { countries, departments, statuses } from "../../data/additionalData";
import {
  userSelectCountry,
  userSelectDepartment,
  userSelectStatus,
} from "../../data/selection";
import { useUsers } from "../../hooks/useUsers";
import { getUniqueOptions } from "../../utility/utility";
import type { IUser } from "../../types/user";
function EditUSer() {
    const { userList, updateUser } = useUsers();
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        country: "",
        department: "",
        status: "",
    });

    const initialData = {
        name: selectedUser?.name ?? "",
        country: selectedUser?.country.value ?? "",
        department: selectedUser?.department.value ?? "",
        status: selectedUser?.status.value ?? "",
    };

    const isChanged =
        formData.name.trim() !== initialData.name ||
        formData.country !== initialData.country ||
        formData.department !== initialData.department ||
        formData.status !== initialData.status;

    const userOptions = getUniqueOptions(
        userList.map((user) => ({ name: user.name, value: user.name }))
    );

    function handleUser(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedUserData = userList.find(
            (user) => user.name === e.target.value
        );

        setSelectedUser(selectedUserData ?? null);

        setFormData({
            name: selectedUserData?.name ?? "",
            country: selectedUserData?.country.value ?? "",
            department: selectedUserData?.department.value ?? "",
            status: selectedUserData?.status.value ?? "",
        });
    }

    function handleSave() {
        if (!selectedUser || !isChanged || !formData.name.trim()) return;

        const country = countries.find(
            (option) => option.value === formData.country
        );
        const department = departments.find(
            (option) => option.value === formData.department
        );
        const status = statuses.find(
            (option) => option.value === formData.status
        );

        if (!country || !department || !status) return;

        const updatedUser: IUser = {
            name: formData.name.trim(),
            country,
            department,
            status,
        };

        updateUser(selectedUser, updatedUser);
        setSelectedUser(updatedUser);
        setFormData({
            ...formData,
            name: updatedUser.name,
        });
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
                        options={userOptions}
                        value={selectedUser?.name ?? ""}
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
                        disabled={!selectedUser || !isChanged || !formData.name.trim()}
                    />
                </div>
            </section>
        </>
    );
}

export default EditUSer;

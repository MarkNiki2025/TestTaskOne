
import { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import Textarea from "./TextAria";

import { users } from "../../data/users";
import type { IUser, Status, Department, Country } from "../../types/user";

import {
  statuses,
  departments,
  countries,
} from "../../data/additionalData";

import {
  userSelectCountry,
  userSelectDepartment,
  userSelectStatus,
} from "../../data/selection";

interface IModalProps {
  onCancel: () => void;
}

function Modal({ onCancel }: IModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    department: "",
    status: "",
  });

  function handleAdd() {
    const country = countries.find(
      (i: Country) => i.value === formData.country
    );

    const department = departments.find(
      (i: Department) => i.value === formData.department
    );

    const status = statuses.find(
      (i: Status) => i.value === formData.status
    );

    if (!country || !department || !status || !formData.name.trim()) {
      return;
    }

    const newUser: IUser = {
      name: formData.name.trim(),
      country,
      department,
      status,
    };

    users.push(newUser);

    onCancel();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-xl flex justify-center items-center flex-col">

        <h3 className="font-karla font-medium text-[24px] tracking-[6px] text-center mb-8">
          Add User
        </h3>
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Textarea
            label="Full name"
            isModal={true}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <Select
            label="Department"
            options={userSelectDepartment}
            isModal={true}
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
          />

          <Select
            label="Country"
            options={userSelectCountry}
            isModal={true}
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />

          <Select
            label="Status"
            options={userSelectStatus}
            isModal={true}
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />
        </div>
          
        <div className="flex justify-end mt-8 gap-4  w-full">
          <Button text="Cancel" onClick={onCancel} />

          <Button
            text="Add"
            onClick={handleAdd}
            disabled={
              !formData.name.trim() ||
              !formData.country ||
              !formData.department ||
              !formData.status
            }
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

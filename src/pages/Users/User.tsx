
import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";

import Header from "../../components/header/Header";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import MultiSelect from "../../components/ui/Multiselect";

import { useUsers } from "../../hooks/useUsers";

import {
  userSelectCountry,
  userSelectDepartment,
  userSelectStatus,
} from "../../data/selection";

const columns = [
  { key: "name", label: "Fullname" },
  { key: "department", label: "Department" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
] as const;

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const { userList, addUser, removeUser } = useUsers();

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const isOtherFiltersEnabled = selectedDepartments.length >= 3;

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleDepartmentChange(value: string[]) {
    setSelectedDepartments(value);

    if (value.length < 3) {
      setSelectedCountries([]);
      setSelectedStatuses([]);
    }
  }

  function handleResetFilters() {
    setSelectedDepartments([]);
    setSelectedCountries([]);
    setSelectedStatuses([]);
  }

  const filteredUsers = userList.filter((user) => {
    const departmentMatch =
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(user.department.value);

    const countryMatch =
      selectedCountries.length === 0 ||
      selectedCountries.includes(user.country.value);

    const statusMatch =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(user.status.value);

    return departmentMatch && countryMatch && statusMatch;
  });

  return (
    <>
      <Header />

      <div className="py-8 px-20 border-2 mx-8 my-2 rounded-xl">
        <h2 className="font-karla font-medium text-[24px] tracking-[6px] text-center">
          Users
        </h2>

        <div className="m-10">
          <div className="flex justify-between items-end gap-4 mb-8">
            <MultiSelect
              label="Department"
              options={userSelectDepartment}
              value={selectedDepartments}
              onChange={handleDepartmentChange}
            />

            <MultiSelect
              label="Country"
              options={userSelectCountry}
              value={selectedCountries}
              onChange={setSelectedCountries}
              disabled={!isOtherFiltersEnabled}
            />

            <MultiSelect
              label="Status"
              options={userSelectStatus}
              value={selectedStatuses}
              onChange={setSelectedStatuses}
              disabled={!isOtherFiltersEnabled}
            />

            <Button
              text={<FaRegTrashCan />}
              onClick={handleResetFilters}
            />

            <Button
              text="Add User"
              onClick={handleOpen}
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-sm font-semibold text-gray-500"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={`${user.name}-${index}`}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.department.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {user.country.name}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          user.status.value === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : user.status.value === "DISABLED"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status.name}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        text={<FaRegTrashCan />}
                        onClick={() => removeUser(user)}
                      />
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {isOpen && (
            <Modal
              onCancel={handleClose}
              onAdd={addUser}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default User;

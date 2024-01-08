"use client";
import { useAddUserMutation } from "@/redux/store";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconPlus } from "@tabler/icons-react";
import AddressDetails from "@/app/components/adressdetails";

const AddUser = () => {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: "",
    firstName: "",
    lastName: "",
    picture: "",
    gender: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      timezone: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "street" ||
      name === "city" ||
      name === "state" ||
      name === "country" ||
      name === "timezone"
    ) {
      handleAddressChange(e);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [addUser] = useAddUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 5) {
      console.error("Telefon numarası en az 5 karakter içermelidir.");
      return;
    }

    try {
      const response = await addUser(formData);

      if (response.error) {
        console.error("Veri gönderilemedi!");
        return;
      }

      console.log("Veri gönderildi!");
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
    console.log(formData);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="flex flex-col border bg-white border-gray-200 shadow-lg rounded-sm mb-6 relative">
          <div className="p-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col col-span-2 rounded "
            >
              <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 gap-x-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="title"
                    defaultValue="none"
                    required
                  >
                    <option value="">Choose One</option>
                    <option value="ms">Ms</option>
                    <option value="miss">Miss</option>
                    <option value="mr">Mr</option>
                    <option value="mrs">Mrs</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="firstName"
                    type="text"
                    required
                    placeholder="First Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="gender"
                    required
                  >
                    <option value="">Choose One</option>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="dateOfBirth"
                    type="datetime-local"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="phone"
                    type="number"
                    placeholder="Phone Number"
                    minLength={5}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Resim
                  </label>
                  <input
                    onChange={(e) =>
                      setFormData({ ...formData, picture: e.target.files[0] })
                    }
                    className="py-2 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                  />
                </div>
              </div>
              <hr className="mt-2 mb-2" />
              <div>
                <div className="text-xl font-semibold mb-2">Location</div>
                <AddressDetails onChange={handleChange} />
              </div>
              <button
                type="submit"
                className="flex justify-center items-center gap-2 px-4 py-1 border-2 text-sm font-semibold border-[#5A66F1] text-white rounded-sm bg-[#5A66F1] w-30 h-10 ml-auto mt-6 hover:bg-[#2e3eed] hover:border-[#5A66F1]"
              >
                <IconPlus size={16} /> Add User
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

"use client";
import { useUpdateUserMutation } from "@/redux/store";
import { useFetchUserDetailsQuery } from "@/redux/store";
import { useEffect, useState } from "react";
import { IconEdit } from "@tabler/icons-react";

const UpdateUser = ({ params }) => {
  const id = params.id;
  const { data: userData, error, isFetching } = useFetchUserDetailsQuery(id);
  const [updateUser] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (userData) {
      setFormData({
        title: userData.title ?? "",
        firstName: userData.firstName ?? "",
        lastName: userData.lastName ?? "",
        gender: userData.gender ?? "",
        email: userData.email ?? "",
        dateOfBirth: userData.dateOfBirth ?? "",
        phone: userData.phone ?? "",
        location: {
          street: userData.location?.street ?? "",
          city: userData.location?.city ?? "",
          state: userData.location?.state ?? "",
          country: userData.location?.country ?? "",
          timezone: userData.location?.timezone ?? "",
        },
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "street" ||
      name === "city" ||
      name === "state" ||
      name === "country" ||
      name === "timezone"
    ) {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length < 5) {
      console.error("Telefon numarası en az 5 karakter içermelidir.");
      return;
    }

    try {
      const updatedData = {};

      Object.keys(formData).forEach((key) => {
        if (key !== "location" && formData[key] !== userData[key]) {
          updatedData[key] = formData[key];
        }
      });

      const updatedLocation = {};

      Object.keys(formData.location).forEach((key) => {
        if (formData.location[key] !== userData.location[key]) {
          updatedLocation[key] = formData.location[key];
        }
      });
      if (Object.keys(updatedLocation).length > 0) {
        updatedData.location = updatedLocation;
      }

      const response = await updateUser({ id, ...updatedData });

      if (response.error) {
        console.error("Veri gönderilemedi!");
        return;
      }
      console.log("Veri gönderildi!");
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  // TARİH FORMAT DEĞİŞİKLİĞİ
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const date = new Date(dateString);
    return date
      .toLocaleDateString("tr-TR", options)
      .replace(".", "/")
      .replace(".", "/");
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
                    value={formData.title}
                    required
                  >
                    <option value="ms">ms</option>
                    <option value="miss">miss</option>
                    <option value="mrs">mrs</option>
                    <option value="mr">mr</option>
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
                    defaultValue={formData.firstName}
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
                    defaultValue={formData.lastName}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="email"
                    type="email"
                    defaultValue={formData.email}
                    readOnly
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
                    value={formData.gender}
                    required
                  >
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
                    defaultValue={formatDate(formData.dateOfBirth)}
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
                    minLength={5}
                    defaultValue={formData.phone}
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
                <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 gap-x-4">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      Street
                    </label>
                    <input
                      onChange={handleChange}
                      className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                      name="street"
                      type="text"
                      defaultValue={formData.location.street}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      onChange={handleChange}
                      className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                      name="city"
                      type="text"
                      defaultValue={formData.location.city}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      State
                    </label>
                    <input
                      onChange={handleChange}
                      className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                      name="state"
                      type="text"
                      defaultValue={formData.location.state}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <input
                      onChange={handleChange}
                      className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                      name="country"
                      type="text"
                      defaultValue={formData.location.country}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-2">
                      Timezone
                    </label>
                    <input
                      onChange={handleChange}
                      className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                      name="timezone"
                      type="text"
                      defaultValue={formData.location.timezone}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center gap-2 px-4 py-1 border-2 text-sm font-semibold border-[#5A66F1] text-white rounded-sm bg-[#5A66F1] w-30 h-10 ml-auto mt-6 hover:bg-[#2e3eed] hover:border-[#5A66F1]"
              >
                <IconEdit size={16} /> Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;

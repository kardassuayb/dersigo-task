"use client";

import { useState } from "react";

export default function AddressDetails({ onChange }) {
  const [address, setAddress] = useState({
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      timezone: "",
    },
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      location: {
        ...address.location,
        [name]: value,
      },
    });

    onChange({ ...address.location, [name]: value });
  };

  return (
    <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-2 gap-x-4">
      <div className="flex flex-col">
        <label className="block text-sm font-medium mb-2">Street</label>
        <input
          onChange={handleAddressChange}
          className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
          name="street"
          type="text"
          placeholder="Street"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium mb-2">City</label>
        <input
          onChange={handleAddressChange}
          className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
          name="city"
          type="text"
          placeholder="City"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium mb-2">State</label>
        <input
          onChange={handleAddressChange}
          className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
          name="state"
          type="text"
          placeholder="State"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium mb-2">Country</label>
        <input
          onChange={handleAddressChange}
          className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
          name="country"
          type="text"
          placeholder="Country"
        />
      </div>
      <div className="flex flex-col">
        <label className="block text-sm font-medium mb-2">Timezone</label>
        <input
          onChange={handleAddressChange}
          className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
          name="timezone"
          type="text"
          placeholder="Ex: (+9:00, -8:00)"
        />
      </div>
    </div>
  );
}

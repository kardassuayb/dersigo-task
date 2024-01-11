"use client";
import { useAddPostMutation } from "@/redux/store";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { IconPlus } from "@tabler/icons-react";
import { IconPhotoScan } from "@tabler/icons-react";
import { TagsInput } from "react-tag-input-component";

const AddPost = ({ params }) => {
  const ownerId = params.id;
  const [selectedTags, setSelectedTags] = useState([]); // react-tag-input-component

  const [formData, setFormData] = useState({
    id: uuidv4(),
    image: "https://www.dersigo.com/assets/images/logo/logo.png",
    likes: 0,
    tags: selectedTags,
    text: "",
    publishDate: new Date(),
    owner: ownerId,
  });

  const tagsInputStyle = {
    input:
      "px-4 border !border-gray-200 block w-full text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "title" ||
      name === "firstName" ||
      name === "lastName" ||
      name === "picture"
    ) {
      setFormData({
        ...formData,
        owner: {
          ...formData.owner,
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

  const [addPost] = useAddPostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addPost(formData);

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
    <div className="grid grid-cols-12 gap-x-6">
      <div className="col-span-12">
        <div className="flex flex-col border bg-[#f4f5f7] border-[#f4f5f7] shadow-sm rounded-sm mb-3 relative">
          <div className="md:flex justify-between items-center space-x-2 my-2">
            <div className="text-blue-600 text-xl ml-3 font-medium">
              New Post
            </div>
          </div>
        </div>
        <div className="flex flex-col border w-auto md:mx-40 bg-[#f4f5f7] border-[#f4f5f7] shadow-sm rounded-sm mb-3 relative">
          <div className="p-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col col-span-1 rounded "
            >
              <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-1 gap-x-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">
                    Image
                  </label>
                  <div className="flex flex-col relative">
                    <input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          image: URL.createObjectURL(e.target.files[0]),
                        })
                      }
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      type="file"
                      id="fileInput"
                      accept="image/jpg, image/jpeg, image/png"
                    />
                    <label
                      htmlFor="fileInput"
                      className="flex items-center justify-center w-full h-60 border border-gray-200 rounded-sm cursor-pointer"
                    >
                      <IconPhotoScan size={100} color="#7E2553" />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">Text</label>
                  <input
                    onChange={handleChange}
                    className="py-3 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm mb-2"
                    name="text"
                    type="text"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <TagsInput
                    classNames={tagsInputStyle}
                    value={selectedTags}
                    onChange={(tags) => {
                      setSelectedTags(tags);
                      setFormData({
                        ...formData,
                        tags: tags,
                      });
                    }}
                    name="tags"
                    placeHolder="Enter the Text"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center gap-2 px-4 py-1 border-2 text-sm font-semibold border-[#5A66F1] text-white rounded-sm bg-[#5A66F1] w-30 h-10 ml-auto mt-6 hover:bg-[#2e3eed] hover:border-[#5A66F1]"
              >
                <IconPlus size={16} /> Add Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;

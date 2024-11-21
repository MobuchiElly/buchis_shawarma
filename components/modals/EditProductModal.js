import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const EditProductModal = ({ closeModal, product, adminAuthId, loadingState }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [prices, setPrices] = useState(product.prices);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions);
  const [extraOptionModal, setExtraOptionsModal] = useState(false);
  const [extraOptionText, setextraOptionText] = useState("")
  const [extraOptionPrice, setextraOptionPrice] = useState("")

  const changePrice = (e, priceIndex) => {
    const currPrices = [...prices];
    currPrices[priceIndex] = e.target.value;
    setPrices(currPrices);
  };

  const handleExtraInput = (e, index, extraVal) => { 
    const updatedExtras = [...extraOptions];
    if (e.target.name === "text"){
      updatedExtras[index] = {...updatedExtras[index], text: e.target.value};
    } else if(e.target.name === "price"){
      updatedExtras[index] = {...updatedExtras[index], price: e.target.value};
    }
    setExtraOptions(updatedExtras);    
  };
  
  const addExtraOption = () => {
    setExtraOptions([...extraOptions, {text: extraOptionText, price: extraOptionPrice}]);
  };

  const handleUpdate = async () => {
    try {
      loadingState(true);
      let url = product.img;
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploadsDB");
        // Upload image to cloudinary
        const uploadRes = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT,
          data
        );
        url = uploadRes.data.url;
      }
      const updatedProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };
      const id = product._id;
      const res = await axios.put(`${process.env.ENDPOINT_URL}/api/products/${id}`, updatedProduct, {headers: {Authorization: `Bearer ${adminAuthId}`}});
      if(res.status === 200){
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
    loadingState(false);
  };

  return (
    <div
      className="fixed inset-0 w-screen z-50 m-auto flex justify-center items-center bg-gray-500 bg-opacity-50 backdrop-blur-sm"
      style={{ overflow: "hidden" }}
    >
      <div
        className="bg-white px-7 py-5 rounded-2xl flex flex-col justify-between relative"
        style={{ width: "600px" }}
      >
        <span
          onClick={() => closeModal()}
          className="font-bold absolute px-4 py-2 bg-black bg-opacity-60 text-white text-xl flex items-center justify-center rounded-full pointer top-1 right-0 cursor-pointer"
        >
          X
        </span>
        <h1 className="text-3xl font-bold ml-0 my-2">Edit Shawarma</h1>
        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Choose an image</label>
          <div className="flex items-end justify-between">
            <Image src={file ? URL.createObjectURL(file) : product.img} alt="pizza image" height={200} width={230}/>
            <input
              className="border-none"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="flex flex-col mb-1 text-base font-medium">
          <label className="mb-1 text-sm font-medium">Title</label>
          <input
            className='font-normal'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Description</label>
          <textarea
            className="bg-slate-50"
            rows={4}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Prices</label>
          <div className="flex justify-between">
            <input
              className="p-1 w-[8vw]"
              type="number" min="0"
              placeholder="Small"
              value={prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className="p-1 w-[8vw]"
              type="number" min="0"
              placeholder="Medium"
              value={prices[1]}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className="p-1 w-[8vw]"
              type="number" min="0"
              placeholder="Large"
              value={prices[2]}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium ">Extra</label>
          <div className="flex flex-wrap mb-1 space-y-2">
            {
              extraOptions && extraOptions.map((option, index) => (
                <span key={index} className="flex flex-1 space-x-2">
                  <input
                    className="bg-slate-100 p-1 rounded"
                    type="text"
                    name="text"
                    value={option.text}
                    placeholder="Item"
                    onChange={(e) => {
                      handleExtraInput(e, index)}}
                  />
                  <input
                    className="bg-slate-100 p-1 rounded w-1/5"
                    type="number" min="0"
                    value={option.price}
                    name="price"
                    placeholder="Price"
                    onChange={(e) => handleExtraInput(e, index)}
                  />
                </span>
              ))
            }
          </div>
          <div><button className="shadow-md px-4 py-2 bg-main-color text-white font-[600] rounded-lg my-2 " onClick={() => setExtraOptionsModal(true)}>Add Extra</button></div>
        </div>
        <button
          className="bg-teal pointer font-bold text-white text-xl py-2 rounded-xl shadow-md w-full border-none self-center hover:bg-teal-700"
          onClick={handleUpdate}
        >
          Update
        </button>
        { extraOptionModal && (
        <div className="fixed inset-0 w-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white py-8 px-6 md:py-10 md:px-12 rounded-lg shadow-lg relative w-11/12 max-w-md">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setExtraOptionsModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Extra Option</h2>
              <p className="text-sm text-gray-500">Provide additional details for this option.</p>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-main-color focus:outline-none"
                value={extraOptionText}
                onChange={(e) => setextraOptionText(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-1">
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-main-color focus:outline-none"
                value={extraOptionPrice}
                onChange={(e) => setextraOptionPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button className="bg-main-color hover:bg-main-dark text-white px-5 py-2 rounded-md shadow-sm transition-all duration-200" onClick={() => {
                addExtraOption();
                setExtraOptionsModal(false)}}>
                Submit
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default EditProductModal;

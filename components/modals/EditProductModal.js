import { useState } from "react";
import axios from "axios";
import Image from "next/image";

const EditProductModal = ({ closeModal, product }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [prices, setPrices] = useState(product.prices);
  const [extraOptions, setExtraOptions] = useState(product.extraOptions);

  const changePrice = (e, priceIndex) => {
    const currPrices = [...prices];
    currPrices[priceIndex] = e.target.value;
    setPrices(currPrices);
  };

  const handleExtraInput = (e, index) => {
    const updatedExtras = [...extraOptions];
    updatedExtras[index] = {...updatedExtras, [e.target.name]:e.target.value};
    setExtraOptions(updatedExtras);
  };
  const handleUpdate = async () => {
    let url = product.img;
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "uploadsDB");
      try {
        const uploadRes = await axios.post(
          process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT,
          data
        );
        url = uploadRes.data.url;
      } catch (error) {
        console.log(error);
      }
    }

    const updatedProduct = {
      title,
      desc,
      prices,
      extraOptions,
      img: url,
    };
    const id = product._id;
    try {
      const res = await axios.put(`${process.env.ENDPOINT_URL}/api/products/${id}`, updatedProduct);
      if(res.status === 200){
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
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
          <label className="mb-1 text-sm font-medium">Extra</label>
          <div className="flex justify-between mb-1 gap-4">
            {
              extraOptions && extraOptions.map((option, index) => (
                <span key={index} className="flex gap-2">
                  <input
                    className="bg-slate-100 p-1 w-[12vw] rounded-sm"
                    type="text"
                    name="text"
                    value={option.text}
                    placeholder="Item"
                    onChange={(e) => handleExtraInput(e, index)}
                  />
                  <input
                    className="bg-slate-100 p-1 w-[8vw] rounded-sm"
                    type="number" min="0" value={option.price}
                    name="price"
                    placeholder="Price"
                    onChange={(e) => handleExtraInput(e, index)}
                  />
                </span>
              ))
            }
          </div>
          <button className="shadow-md px-4 py-2 w-[10vw] bg-pink-600 text-white rounded my-2">Add Extra</button>
        </div>
        <button
          className="bg-teal pointer font-bold text-white text-xl py-2 rounded-xl shadow-md w-full border-none self-center hover:bg-teal-700"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;

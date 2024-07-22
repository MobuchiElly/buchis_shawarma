import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/AddModal.module.css";
import Image from "next/image";

const AddModal = ({ setOpen }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extras, setExtras] = useState(null);

  const changePrice = (e, priceIndex) => {
    const currPrices = prices;
    currPrices[priceIndex] = e.target.value;

    setPrices(currPrices);

    // I would try out this shorter block of code below that should achieve same purpose
    // setPrices(prevPrices => [...prevPrices, prevPrices[priceIndex] = e.target.value]);
  };

  const handleExtraInput = (e) => {
    setExtras({ ...extras, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extras]);
  };
  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploadsDB");
    try {
      const uploadRes = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT,
        data
      );
        console.log("uploadRes",uploadRes);
      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };
      await axios.post(`${process.env.ENDPOINT_URL}/api/products`, newProduct);
      //setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className="fixed inset-0 w-screen z-50 m-auto flex justify-center items-center  bg-gray-500 bg-opacity-50 backdrop-blur-sm"
      style={{ overflow: "hidden" }}
    >
      <div
        className=" bg-slate-100 px-7 py-5 rounded-2xl flex flex-col justify-between relative"
        style={{ width: "600px" }}
      >
        <span
          onClick={() => setOpen(false)}
          className="font-semibold absolute w-7 h-7 bg-slate-700 text-white flex items-center justify-center rounded-2xl pointer top-0 right-0 cursor-pointer"
        >
          x
        </span>
        <h1 className="text-3xl font-bold ml-0 my-2">Add a new Shawarma</h1>
        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Choose an image</label>
          <div className="flex items-end justify-between">
            {
              file && <Image src={file ? URL.createObjectURL(file) : ""} alt="shawrma image" height={200} width={230} className="rounded px-2"/>
            }
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
            className="bg-slate-100 font-normal"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Description</label>
          <textarea
            className="bg-slate-100"
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Prices</label>
          <div className="flex justify-between">
            <input
              className="bg-slate-100 w-[8vw]"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className="bg-slate-100 w-[8vw]"
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className="bg-slate-100 w-[8vw]"
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm font-medium">Extra</label>

          <div className="flex justify-between mb-1">
            <input
              className="bg-slate-100 w-[8vw] p-0"
              type="text"
              name="text"
              placeholder="Item"
              onChange={handleExtraInput}
            />
            <input
              className="bg-slate-100 w-[8vw] p-0"
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleExtraInput}
            />
            <button
              className="bg-slate border border-slate-700 px-4 py-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded"
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mx-1 my-0 gap-4 py-2">
            {extraOptions.map((option) => (
              <span key={option.text} className="capitalize font-mono font-semibold">
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button
          className="bg-teal hover:bg-teal-700 pointer font-medium text-white px-0 py-1.5 rounded-md border-none self-end"
          onClick={handleCreate}
          style={{ width: "25%" }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddModal;

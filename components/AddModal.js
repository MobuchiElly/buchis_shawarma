import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";
import styles from '../styles/AddModal.module.css';
import useBodyScroll from "./hooks";

const AddModal = ({ setCloseModal }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extras, setExtras] = useState(null);
    const [ mscroll, hideScroll, showScroll ] = useBodyScroll();
    
    const changePrice = (e, priceIndex) => {
        const currPrices = prices;
        currPrices[priceIndex] = e.target.value;

        setPrices(currPrices);

        // I would try out this shorter block of code below that should achieve same purpose
        // setPrices([...prices], prices[index] = e.target.value);
    }
    
    const handleExtraInput = (e) => {
        setExtras({...extras, [e.target.name]: e.target.value});
    }
    
    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extras]);
    }; 
    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploadsDB")
        try{
            const uploadRes = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT, data);

            const { url } = uploadRes.data;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img: url,
            };
            await axios.post(`${process.env.ENDPOINT_URL}/api/products`, newProduct);
            setCloseModal(true);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        hideScroll();

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

  return (
    <div className='fixed w-screen h-screen top-0 m-auto flex justify-center items-center  bg-transparent backdrop-blur-md' style={{zIndex:'999', overflow:'hidden'}}>
        <div className=" bg-slate-100 px-7 py-5 rounded-2xl flex flex-col justify-between relative" style={{width:'600px'}}>
            <span onClick={() => {setCloseModal(true); hideScroll()}} className="font-semibold absolute w-7 h-7 bg-slate-700 text-white flex items-center justify-center rounded-2xl pointer top-0 right-0">x</span>
            <h1 className="text-3xl font-bold ml-0 my-2">Add a new Shawarma</h1>
            <div className="flex flex-col mb-2">
                <label className="mb-1 text-sm font-medium">Choose an image</label>
                <input className='border-none' type='file' onChange={(e) => setFile(e.target.files[0])}/>
            </div>

            <div className="flex flex-col mb-1 text-base font-medium">
                <label className="mb-1 text-sm font-medium">Title</label>
                <input className={`${styles.input} bg-slate-100`} type='text' onChange={(e) => setTitle(e.target.value)}/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 text-sm font-medium">Description</label>
                <textarea className="bg-slate-100" rows={4} type="text" onChange={(e) => setDesc(e.target.value)}/>
            </div>

            <div className="flex flex-col mb-2">
                <label className="mb-1 text-sm font-medium">Prices</label>
                <div className="flex justify-between">
                    <input className={`${styles.input} bg-slate-100 w-20`} type='number' placeholder="Small" onChange={(e) => changePrice(e, 0)}/>
                    <input className={`${styles.input} bg-slate-100 w-20`} type='number' placeholder="Medium" onChange={(e) => changePrice(e, 1)}/>
                    <input className={`${styles.input} bg-slate-100 w-20`} type='number' placeholder="Large" onChange={(e) => changePrice(e, 2)}/>
                </div>
            </div>
            {/* border-bottom: 1px solid grey; */}
            <div className="flex flex-col mb-2">
                <label className="mb-1 text-sm font-medium">Extra</label>
                
                <div className="flex justify-between mb-1">
                    <input className={`${styles.input} bg-slate-100 w-20 p-0`} type='text' name="text" placeholder="Item" onChange={handleExtraInput}/>
                    <input className={`${styles.input} bg-slate-100 w-20 p-0`} type='number' name="price" placeholder="Price" onChange={handleExtraInput}/>
                    <button className="bg-slate border border-slate-700 px-3" onClick={handleExtra}>
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap mx-1 my-0" >
                    {extraOptions.map((option) => (
                        <span key={option.text} className={`${styles.extraItem}`}>{option.text}</span>
                    ))}
                </div>
            </div>
            <button className="bg-teal pointer font-medium text-white px-0 py-1.5 rounded-md border-none self-end" onClick={handleCreate} style={{width:'25%'}}>
                Create
            </button>
        </div>
    </div>
  )
}

export default AddModal
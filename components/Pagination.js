import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Pagination = ({activePage, setactivePage, handlePagination}) => {
  return (
    <div className="min-h-10 py-6 px-24 flex flex-col">
        <div className="border border-b-black w-full mb-4"></div>
        <div className="flex justify-center p-2 space-x-2">
            <div className={`shadow-md py-1 px-4 border border-black text-black text-lg cursor-pointer ${activePage === 1 ? "font-bold" : 'font-normal'}`} onClick={() => setactivePage(1)}>
                1
            </div>
            <div className={`shadow-md py-1 px-4 border border-black text-black text-lg cursor-pointer ${activePage === 2 ? "font-bold" : 'font-normal'}`} onClick={() => setactivePage(2)}>
                2
            </div>
            <div className="shadow-md py-1 px-2 border border-black cursor-pointer" onClick={() => setactivePage(2)}>
            <FaArrowRight size={24} color="black" className="p-1"/>
            </div>
        </div>
    </div>
  )
}

export default Pagination
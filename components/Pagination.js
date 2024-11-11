import { FaArrowLeft, FaArrowRight, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Pagination = ({activePage, setactivePage, handlePagination, totalPages}) => {
  return (
    <div className="min-h-10 py-6 px-24 flex flex-col">
      <div className="border border-b-black w-full mb-4"></div>
      <div className="flex justify-center text-black">
        <button aria-label="Previous page" className="bg-[#f4f4f4] py-2 px-3 rounded-full font-bold font-mono mr-1 rotate-180"
          onClick={() => handlePagination(activePage - 1)} disabled={activePage <= 1}>
          <svg data-v-608d409f="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-608d409f="" d="M2.66667 8H13.3333M13.3333 8L9.33334 4M13.3333 8L9.33334 12" stroke="#0D1821" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <button aria-label="Current page" className="bg-[#c7d3f1] py-2 px-4 rounded-full font-bold font-mono mr-1"
          onClick={() => handlePagination(activePage)}>
            {activePage}
        </button>
        <button aria-label="Next page" className="bg-[#f3f3f3] py-2 px-3 rounded-full"
          onClick={() => handlePagination(activePage + 1)} disabled={activePage >= totalPages}>
          <svg data-v-608d409f="" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path data-v-608d409f="" d="M2.66667 8H13.3333M13.3333 8L9.33334 4M13.3333 8L9.33334 12" stroke="#0D1821" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination
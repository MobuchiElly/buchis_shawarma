import { FadeLoader } from 'react-spinners';
import ShawarmaCard from './ShawarmaCard';

const Shawarmalist = ({ shawarmaList, loading }) => {
  

  return (
    <div className='min-h-[70vw] lg:mx-2 lg:max-w-[98vw]' style={{padding:'20px 10px'}}>
      <div className="py-2 pt-0 lg:mb-4 flex flex-col items-center">
        <span className='block text-center text-3xl font-[700]'>Tasty and Thrilling!!</span>
        <div className='border-b border-b-black w-80 h-2'></div>
      </div>
      {loading ? <div className="flex justify-center items-center mt-20">
          <FadeLoader size={20}/>
        </div> :
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {shawarmaList.map((val) => (
                <ShawarmaCard shawarma={val} key={val._id}/>
        ))}
      </div>
          }
    </div>
  )
}

export default Shawarmalist;
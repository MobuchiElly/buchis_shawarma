import { useState } from 'react';
const OrderDetail = ({ totalprice, createOrder, closeForm }) => {
  const [customername, setCustomername] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    createOrder({ customername, address, totalprice, paymentmethod: 0 });
  }

  return (
    <div className="w-full h-screen  absolute top-0 left-0 flex justify-center items-center backdrop-blur" style={{zIndex:"999"}}>
      <div className="w-500 bg-white rounded p-20 relative">
        <span className='absolute flex items-center justify-center top-0 right-1 bg-red-500 hover:scale-150 hover:bg-main-bg-800 cursor-pointer rounded-2xl w-7 h-7 font-semibold text-white' onClick={() => closeForm()}>x</span>
        <h1 className='text-3xl mb-4 pb-1 font-extralight flex flex-col justify-center items-center'>
          You will pay ₦100 after delivery.
        </h1>
        <div className='flex flex-col w-100 mb-1.5'>
          <label className='mb-1 '>Name Surname</label>
          <input placeholder="Nick Doxa" type="text" className='rounded-md h-8' onChange={(e) => setCustomername(e.target.value)}/>
        </div>
        <div className='flex flex-col w-100% mb-15px'>
          <label className='mb-10px'>Phone Number</label>
          <input
            type="text"
            placeholder="+234 813 xxx xxxx"
            className='rounded-md h-40px'
          />
        </div>
        <div className='flex flex-col w-100% mb-15px'>
          <label className='mb-10px'>Address</label>
          <textarea
            rows={5}
            placeholder="9 Ojoka street, Lagos"
            type="text"
            className='rounded-md'
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className='border-none bg-teal hover:bg-teal-700 outline- text-white font-500 text-16px rounded-xl hover:border-teal-500 cursor-pointer' style={{padding:'10px 20px'}} onClick={handleSubmit}>
          Order
        </button>
      </div>
    </div>
  )
}

export default OrderDetail
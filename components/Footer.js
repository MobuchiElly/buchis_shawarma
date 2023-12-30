import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  
  return (
    <div className='text-motto-color container-fluid min-h-screen bg-gray-900 flex bottom-0 text-my sm:h-auto sm:text-center' style={{height:'calc(100vh - 100px'}}>
      <div className='md:flex flex-1 relative hidden' >
        <Image src="/img/bg.png" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1500px) 100vw, 33vw" alt='telephone image' />
      </div>

      <div className='flex flex-col px-1 py-50 md:p-50 md:flex-row md:flex-2 md:relative md:justify-between'>
        <div className='md:flex-1 mb-8 md:mb-0 px-20'>
          <h2 className='text-motto-color text-xl'>The perfect spot for you and your loved ones!!!</h2>
          <h2 className='text-motto-color text-xl'>Make every bite a blissfull experience.</h2>
        </div>
        <div className='md:flex-1 px-20'>
          <h1 className='text-mytitle-color text-2xl sm:text-30px mb-3 '>FIND OUR RESTAURANTS</h1>
          <p className=' text-lightgray sm:text-20px mb-3'>
            24 Wisdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className=' text-lightgray sm:text-20px mb-3'>
            24 Wisdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className=' text-lightgray sm:text-20px mb-3'>
            24 Wisdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className=' text-lightgray sm:text-20px'>
            24 Wisdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
        </div>
        <div className='flex-1 px-20 mt-5 md:mt-0'>
          <h1 className='text-mytitle-color text-2xl sm:text-30px'>WORKING HOURS</h1>
          <p className='sm:text-20px'>MONDAY TO FRIDAY
          <br />9:00am - 10:00pm
          </p>
          <p className='sm:text-20px'>SATURDAY - SUNDAY
          <br />12:00pm - 12:00am
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
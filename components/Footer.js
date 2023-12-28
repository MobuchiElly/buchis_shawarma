import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='text-motto-color container-fluid bg-gray-900 flex bottom-0 text-my sm:h-auto sm:text-center' style={{height:'calc(100vh - 100px', border:'10px solid green'}}>
      <div className='md:flex flex-1 relative hidden' >
        <Image src="/img/bg.png" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1500px) 100vw, 33vw" alt='telephone image' />
      </div>

      <div className='flex flex-col md:flex-row md:flex-2 relative justify-between ' style={{padding:'50px'}}>
        <div className='flex-1' style={{padding:'0 20px'}}>
          <h2 className='text-motto-color'>The perfect spot for you and your loved ones!</h2>
        </div>
        <div className='flex-1' style={{padding:'0 20px'}}>
          <h1 className='text-mytitle-color text-mytitle-size sm:text-30px'>FIND OUR RESTAURANTS</h1>
          <p className=' text-lightgray sm:text-20px'>
            24 Wsdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className=' text-lightgray sm:text-20px'>
            24 Wsdom central, Dukeles way, 
            <br/>Ikeja, Lagos,
            <br/>Nigeria
          </p>
          <p className=' text-lightgray sm:text-20px'>
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
        <div className='flex-1' style={{padding:'0 20px'}}>
          <h1 className='text-mytitle-color text-mytitle-size sm:text-30px'>WORKING HOURS</h1>
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
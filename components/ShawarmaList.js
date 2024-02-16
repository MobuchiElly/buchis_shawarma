import ShawarmaCard from './ShawarmaCard';

const Shawarmalist = ({ shawarmaList }) => { 
  return (
    <div className='flex flex-col items-center justify-center' style={{padding:'20px 10px'}}>
      <h1 className='text-center text-3xl md:text-4xl font-bold'>BEST SHAWARMA IN TOWN</h1>
          <p className='text-center w-90% lg:w-70% text-24px text-#444'>Buchis Shawarma invites you on a culinary journey like no other, where savory flavors and aromatic spices come together to create an unforgettable shawarma experience. Our commitment to quality and passion for authentic taste make us the go-to destination for shawarma enthusiasts</p>
      <div className='w-100% flex items-center justify-center flex-wrap md:flex-nowrap'>
        {shawarmaList.map((val) => (
                <ShawarmaCard shawarma={val} key={val._id}/>
        ))}
      </div>
    </div>
  )
}

export default Shawarmalist;
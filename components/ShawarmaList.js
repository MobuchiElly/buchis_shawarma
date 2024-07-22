import ShawarmaCard from './ShawarmaCard';

const Shawarmalist = ({ shawarmaList, loading }) => {
  

  return (
    <div className='min-h-[35vw] lg:mx-2 lg:max-w-[98vw]' style={{padding:'20px 10px'}}>
      <div className="p-2 pt-0 space-y-3 lg:mb-4 shadow-sm">
        <h1 className='text-center text-3xl md:text-4xl font-bold'>BEST SHAWARMA IN TOWN</h1>
        <p className='text-left lg:text-center md:w-90% lg:w-90% text-22px text-#444 px-2 lg:px-0'>Embark on a culinary journey like no other, where savory flavors and aromatic spices come together to create an unforgettable shawarma experience. Our commitment to quality and passion for authentic taste make us the go-to destination for shawarma enthusiasts</p>
      </div>
      {loading ? <div>Loading...</div> :
      <div className='p-2 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {shawarmaList.map((val) => (
                <ShawarmaCard shawarma={val} key={val._id}/>
        ))}
      </div>
          }
    </div>
  )
}

export default Shawarmalist;
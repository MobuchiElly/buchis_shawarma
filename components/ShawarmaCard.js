import Image from 'next/image'
import Link from 'next/link'

const ShawarmaCard = ({ shawarma }) => {
  return (
    <div className='w-100% flex flex-col justify-center items-center cursor-pointer' key={shawarma._id} style={{padding:'20px 40px'}}>
            <Link href={`/product/${shawarma._id}`}>
              <Image src={shawarma.img} alt='' width='500' height='500' />
              <h1 className='text-30px md:text-18px font-bold uppercase text-main-color text-center'>{shawarma.title}</h1>
            </Link>
            <span className='text-24px md:text-18px font-bold text-#666'>₦{shawarma.prices[0]}</span>
            <p className='text-#777 text-center text-24px md:text-base'>{shawarma.desc}</p>
    </div>
  )
}

export default ShawarmaCard;
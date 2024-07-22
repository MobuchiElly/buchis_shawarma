import Image from 'next/image'
import Link from 'next/link'

const ShawarmaCard = ({ shawarma }) => {
  return (
    <div className='w-100% flex flex-col items-center cursor-pointer shadow-md min-h-[40vh] space-y-1 p-2' key={shawarma._id}>
            <Link href={`/product/${shawarma._id}`}>
              <Image src={shawarma.img} alt='' width='500' height='500' className="h-72"/>
              <h1 className='text-30px md:text-18px font-bold uppercase text-main-color text-center'>{shawarma.title}</h1>
            </Link>
            <span className='text-22px md:text-18px font-bold text-#666  '>₦{shawarma.prices[0]}</span>
            <p className='text-#777 text-left px-2 text-22px md:text-base'>{shawarma.desc.length > 40 ? shawarma.desc.slice(0, 30) + "...." : shawarma.desc}</p>
    </div>
  )
}

export default ShawarmaCard;
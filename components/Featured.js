import Image from "next/image";
import { useState } from "react";


const Featured = ({ shawarmaList }) => {
    const [index, setIndex] = useState(0);
    const [shawarma, setShawarma] = useState(shawarmaList.slice(0, 3) || null);
    
    const handleClick = (direction) => {
        if (direction == 'l') {
            setIndex(index !== 0 ? index-1 : 2);
        }
        if (direction == 'r') {
            setIndex(index !== 2 ? index+1 : 0)
        }
    }
    
  return ( 
    <div className='bg-main-bg-600 overflow-hidden h-[79vh]'>
        <div className="h-full relative">
            <div className='absolute top-0 bottom-0 m-auto cursor-pointer' style={{left: '0', height:'10%', width:'10%', zIndex:'2'}} onClick={() => handleClick('l')}>
                <Image src="/img/arrowl.png" alt="scroll left" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit:"contain"}}/>
            </div>

            <div className='flex border-blue-300 pb-2 p-3' style={{transform:`translateX(${-100*index}vw)`, transition:'all 1.5s ease-in-out', height:'100%', width:'300vw'}}>
                    {shawarma.map((value, index) => (
                                <div className='relative w-100vw h-94%' key={index}>
                                    <Image priority={false} src={value.img}  alt="shawarma images" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  style={{objectFit:"contain"}}/>
                                </div>
                    ))}
            </div>
            <div className='absolute top-0 bottom-0 m-auto cursor-pointer' style={{right:'0', height:'10%', width:'10%', zIndex:'2'}} onClick={() => handleClick('r')}>
                <Image src="/img/arrowr.png" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit:"contain"}} alt="scroll right"/>
            </div>
        </div>
    </div>
  )
}

export default Featured
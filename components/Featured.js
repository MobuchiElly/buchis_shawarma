import Image from "next/image";
import { useState } from "react";
import styles from '../styles/Featured.module.css';

const Featured = ({ shawarmaList }) => {
    const [index, setIndex] = useState(0);
    const [shawarma, setShawarma] = useState(shawarmaList.slice(0, 3));
    
    const handleClick = (direction) => {
        if (direction == 'l') {
            setIndex(index !== 0 ? index-1 : 2);
        }
        if (direction == 'r') {
            setIndex(index !== 2 ? index+1 : 0)
        }
    }
    
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left: '0'}} onClick={() => handleClick('l')}>
            <Image src="/img/arrowl.png" alt="scroll left" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit:"contain"}}/>
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
                {shawarma.map((value, index) => (
                            <div className={styles.imgContainer} key={index}>
                                <Image priority={false} src={value.img}  alt="shawarma images" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  style={{objectFit:"contain"}} />
                            </div>
                ))}
        </div>
        <div className={styles.arrowContainer} style={{right:'0'}} onClick={() => handleClick('r')}>
            <Image src="/img/arrowr.png" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{objectFit:"contain"}} alt="scroll right"/>
        </div>
    </div>
  )
}

export default Featured
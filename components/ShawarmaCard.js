import styles from '../styles/ShawarmaCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const ShawarmaCard = ({ shawarma }) => {
  return (
    <div className={styles.container} key={shawarma._id}>
            <Link href={`/product/${shawarma._id}`}>
              <Image src={shawarma.img} alt='' width='500' height='500' />
              <h1 className={`${styles.title} uppercase text-center`}>{shawarma.title}</h1>
            </Link>
            <span className={styles.price}>₦{shawarma.prices[0]}</span>
            <p className={styles.desc}>{shawarma.desc}</p>
    </div>
  )
}

export default ShawarmaCard;
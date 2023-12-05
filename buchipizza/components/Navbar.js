import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.item}>
            <div className={styles.callButton}>
                <Image src="/img/telephone.png" alt='telephone' width={32} height={32}/>
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>ORDER NOW!</div>
                <div className={styles.text}>08134923317</div>
            </div>
        </div>
        <div className={styles.item}>
                <ul className={styles.list}>
                    <li className={styles.listItem}>HomePage</li>
                    <li className={styles.listItem}>Products</li>
                    <li className={styles.listItem}>Menu</li>
                    <Image src="/img/buchislogo.png" alt="logo" width="160" height="79"/>
                    {/* <h1 className='text-2xl font-bold border-red-200 text-neutral-100' style={{fontSize:'40px'}}><i>Buchis Pizza</i></h1> */}
                    <li className={styles.listItem}>Events</li>
                    <li className={styles.listItem}>Blog</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
        </div>
        <div className={styles.item}>
            <div className={styles.cart}>
                <Image src="/img/cart.png" alt="logo" width="30" height="30"/>
                <div className={styles.counter}>2</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
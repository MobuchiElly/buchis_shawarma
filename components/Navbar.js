import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    
    return (
    <div className='flex justify-between items-center md:p-x-15 px-4 bg-main-bg-600 sticky top-0 z-20 h-m100' >
        <div className={`flex items-center lg:flex-3 bg-blue-`} style={{flex:1}}>
            <div className={` bg-white rounded-full p-2 w-my-50 h-my-50`}>
                <Image src="/img/telephone.png" alt='telephone' width={32} height={32}/>
            </div>
            <div className='ml-5 text-white'>
                <div className='text-xss font-semibold'>ORDER NOW!</div>
                <div className='font-bold text-xl'>08134923317</div>
            </div>
        </div>
        <div className={`hidden lg:block`} style={{flex:3}}>
                <ul className='p-0 flex items-center list-none text-white'>
                    <Link href='/'>
                        <li className='font-my500 cursor-pointer m-5'>HomePage</li>
                    </Link>
                    <li className='font-my500 cursor-pointer m-5'>Products</li>
                    <li className='font-my500 cursor-pointer m-5'>Menu</li>
                    <Image src="/img/buchislogo.png" alt="logo" width="160" height="80"/>
                    <li className='font-my500 cursor-pointer m-5'>Events</li>
                    <li className='font-my500 cursor-pointer m-5'>Blog</li>
                    <li className={styles.listItem}>Contact</li>
                </ul>
        </div>
        <Link href="/cart">
            <div className={`${styles.item} last:justify-end`}>
                <div className='relative'>
                    <Image src="/img/cart.png" alt="logo" width="30" height="30"/>
                    <div className='absolute bg-white font-bold w-5 h-5 flex justify-center items-center rounded-full p3 text-main-color' style={{top:'-10px', left:'-10px', }}>{quantity}</div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Navbar
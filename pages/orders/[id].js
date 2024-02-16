import styles from '../../styles/Order.module.css'
import Image from "next/image"
import axios from 'axios';

const Order = ({order}) => {
    const status = order.status; console.log(order.status);
    console.log('hello world');

    const renderui = (index) => {
        if (index - status < 1) 
            return styles.done;
        if (index - status === 1)
            return styles.inProgress;
        if (index - status > 1)
            return styles.notDone;
    }
  return (
    <div className='p-50px flex flex-col lg:flex-row'> 
        <div className='flex-2'>
            <div className={styles.row}>
            <table className='w-100% text-left mb-50px'>
                    <thead>
                        <tr className='hidden lg:table-row'> 
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='flex flex-col justify-center items-center text-20px lg:table-row'>
                            <td>
                                <span className={styles.id}>{order._id}</span>
                            </td>
                            <td>
                                <span className={styles.name}>{order.customername}</span>
                            </td>
                            <td>
                                <span className={styles.address}>{order.address}</span>
                            </td>
                            <td>
                                <span className={styles.total}>₦{order.totalprice}</span>
                            </td>
                        </tr>
                    </tbody>
            </table>
            </div>
            <div className='w-100% flex flex-col items-center justify-center lg:w-92% lg:flex-row lg:justify-between'> 
                <div className={renderui(0)}>
                    <Image src="/img/paid.png" width={30} height={30} alt=""/>
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image className={styles.checkedIcon} src="/img/checked.png" width={20} height={20} alt=""/>
                    </div>
                </div>    
                <div className={renderui(1)}>
                        <Image src="/img/bake.png" width={30} height={30} alt="" />
                        <span>Preparing</span>
                        <div className={styles.checkedIcon}>
                            <Image
                            className={styles.checkedIcon}
                            src="/img/checked.png"
                            width={20}
                            height={20}
                            alt=""
                        />
                        </div>
                    </div>
                    
                <div className={renderui(2)}>
                    <Image src="/img/bike.png" width={30} height={30} alt="" />
                    <span>On the way</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/img/checked.png"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>

                <div className={renderui(3)}>
                    <Image src="/img/delivered.png" width={30} height={30} alt="" />
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image
                            className={styles.checkedIcon}
                            src="/img/checked.png"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>

            </div>
        </div>

        <div className='flex-1'>
            <div className={`${styles.wrapper} w-100% lg:w-90% bg-#333 text-white flex flex-col justify-between p-50px pt-10px max-h-300px`}>
                <h2 className={`${styles.title} font-bold text-lg`}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className='mr-10px'>Subtotal:</b>₦{order.totalprice}
                </div>
                <div className={styles.totalText}>
                    <b className='mr-10px'>Discount:</b>₦0.00
                </div>
                <div className={styles.totalText}>
                    <b className='mr-10px'>Total:</b>₦{order.totalprice}
                </div>
                <button disabled className='bg-white h-30px text-teal font-bold mt-20px cursor-not-allowed rounded-sm'>
                    PAID
                </button>
            </div>
        </div>  
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`${process.env.ENDPOINT_URL}/api/orders/${params.id}`);
    return {
        props: {
            order: res.data
        },
    }
}

export default Order;
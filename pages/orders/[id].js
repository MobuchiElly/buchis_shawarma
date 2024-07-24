import styles from '../../styles/Order.module.css'
import Image from "next/image"
import axios from 'axios';

const Order = ({order}) => {
    const status = order.status; console.log(order.status);

    const renderui = (index) => {
        if (index - status < 1) 
            return styles.done;
        if (index - status === 1)
            return styles.inProgress;
        if (index - status > 1)
            return styles.notDone;
    }
  return (
    <div className='p-4 py-6 lg:px-14 lg:py-16 min-h-[80vh] flex flex-col lg:flex-row'> 
        <div className='flex-2'>
            <div className={styles.row}>
            <table className='w-100% text-left mb-9 lg:mb-50px'>
                    <thead>
                        <tr className='hidden lg:table-row'> 
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='flex flex-col justify-center lg:items-center text-20px lg:table-row'>
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
            <div className='w-100% flex space-x-5 pb-4 lg:space-x-40 px-1 lg:px-12 lg:pt-6'> 
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
            <div className={`${styles.wrapper} w-100% lg:w-90% bg-#333 text-white flex flex-col justify-between p-[50px] py-8 max-h-300px`}>
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
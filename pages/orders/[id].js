import styles from '../../styles/Order.module.css'
import Image from "next/image"
import axios from 'axios';

const Order = ({order}) => {
    const status = order.status;

    const renderui = (index) => {
        if (index - status < 1) 
            return styles.done;
        if (index - status === 1)
            return styles.inProgress;
        if (index - status > 1)
            return styles.notDone;
    }
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
            <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.tr}>
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
            <div className={styles.row}>
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

        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>₦{order.totalprice}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>₦0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>₦{order.totalprice}
                </div>
                <button disabled className={styles.button}>
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
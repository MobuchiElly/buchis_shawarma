import useBodyScroll from "./hooks";


const AddShawarmaBtn = ({ setCloseModal }) => {
  const [ mscroll, hideScroll, showScroll ] = useBodyScroll();
 
  console.log(typeof mscroll);
  return (
    <button className="p-2 m-2 bg-main-bg-600 rounded-lg text-white font-semibold text-center pointer hover:bg-main-bg-600" style={{width:'120px'}} onClick={() => {
      hideScroll();
      setCloseModal(false);
    }}>
        Add New Product
    </button>
  )
}

export default AddShawarmaBtn;
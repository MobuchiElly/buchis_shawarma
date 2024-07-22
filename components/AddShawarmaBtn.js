const AddShawarmaBtn = ({ setOpen }) => {  
 
  return (
    <button className="absolute left-1 top-1 p-2 py-4 bg-main-bg-600 rounded-lg text-white font-semibold text-center pointer hover:bg-main-bg-600" onClick={() => {
      setOpen(true);
    }}>
        Add Product
    </button>
  )
}

export default AddShawarmaBtn;
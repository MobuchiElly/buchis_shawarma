

const MessageModal = ({ content, handleModal }) => {
    

  return (
    <div className="fixed z-40 inset-0 bg-gray-100 opacity-90">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between pt-7 p-3 pb-0  rounded-t">
              <h3 className="text-2xl font-semibold w-full text-center">Success</h3>
            </div>
            {/*body*/}
            <div className="relative p-4 pt-1 flex-auto">{content}</div>
            {/*footer*/}
            <div className="flex items-center justify-end p-2 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
    </div>
  );
};

export default MessageModal;
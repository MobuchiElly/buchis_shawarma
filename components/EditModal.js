import { useState, useEffect } from "react";
import { addAdmin, removeAdmin } from "../HOFunctions/dbFunctions";

export const EditModal = ({ userDetail, closeModal }) => {
  const [accountType, setAccountType] = useState("");
  const [lockAccount, setLockAccount] = useState("yes");
  const { userId, isAdmin } = userDetail;
  useEffect(() => {
    isAdmin ? setAccountType('admin') : setAccountType('user');
  }, [isAdmin]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    //if lockAccount is set to yes i would set Lock account to true thus locking the account
    if (accountType == 'admin') {
      try {
        await addAdmin(userId);
        console.log('successfully aded user as an admin');
      } catch (err) {
        console.error("error updating admin role", err);
      }
    } else {
      try {
        await removeAdmin(userId);
        console.log('successfully removed user from admin role');
      } catch (err) {
        console.error("error removing admin role", err);
      }
    } 
    return;
  };


  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-100 backdrop-filter backdrop-blur-sm "
      style={{ zIndex: 999, overflow: "hidden" }}
    >
      <form
        onSubmit={(e) => handleUpdate(e)}
        className="bg-white rounded-lg shadow-lg p-8 relative"
        style={{ zIndex: 999, width: "80%" }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Update User</h2>

        <div className="mb-4">
          <label
            htmlFor="accountType"
            className="block text-sm font-medium text-gray-700"
          >
            Manage Account Type*
          </label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="lockAccount"
            className="block text-sm font-medium text-gray-700"
          >
            Lock Account*
          </label>
          <select
            id="lockAccount"
            value={lockAccount}
            onChange={(e) => setLockAccount(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="block mt-16 mb-12">
          <button
            type="submit"
            className="block w-full py-2 px-6  bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save Changes
          </button>
        </div>
        <button onClick={closeModal}
            className="absolute right-4 bottom-2 p-2 bg-main-bg-800 text-white font-medium rounded-md hover:bg-main-color focus:outline-none focus:ring focus:border-orange-300"
          >
            Close
          </button>
      </form>
    </div>
  );
};

export default EditModal;
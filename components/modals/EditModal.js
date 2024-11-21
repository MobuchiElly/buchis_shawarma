import { useState, useEffect } from "react";
import axios from "axios";

export const EditModal = ({ userDetail, adminAuthId, closeModal }) => {
  const [accountType, setAccountType] = useState("");
  const [lockAccount, setLockAccount] = useState("yes");
  const { authId, isAdmin } = userDetail;

  useEffect(() => {
    isAdmin ? setAccountType('admin') : setAccountType('user');
  }, [isAdmin]);
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    //if lockAccount is set to yes i would set Lock account to true thus locking the account
    try {
      if (accountType == 'admin') {
        const res = await axios.put(`${process.env.ENDPOINT_URL}/api/users/${authId}`, { isAdmin: true}, { headers: {Authorization: `Bearer ${adminAuthId}`}});
        if(res.status === 200){
          closeModal();
        }
      } else {
          const res = await axios.put(`${process.env.ENDPOINT_URL}/api/users/${authId}`, { isAdmin: false}, { headers: {Authorization: `Bearer ${adminAuthId}`}});
          if (res.status === 200) {
            closeModal();
          }
      }
    } catch (err) {
      console.error("error updating user role", err);
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen flex items-center justify-center bg-gray-700 bg-opacity-50 backdrop-blur-sm z-50"
      style={{overflow: "hidden" }}
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
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100"
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
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-100"
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
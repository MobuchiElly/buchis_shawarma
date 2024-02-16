import { useState } from "react";

const NavDropDown = ({content}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='text-white'>
        <div
        id="dropdownDefaultButton"
        className="text-white rounded-lg py-2.5 text-center inline-flex items-center "
        type="button"
        onClick={toggleDropdown}
      >
        Contact
      </div>
        {isOpen && (
        <div className="bg-gray-700 w-44 text-sm text-left p-1 rounded-lg z-10 absolute shadow">
          <span className="block p-1 px-2">buchidevv@gmail.com</span>
          <span className="block p-1 px-2">Phone: 08134923317</span>
        </div>
      )}
    </div>
  )
}
export default NavDropDown;
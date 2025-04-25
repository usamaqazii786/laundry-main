// // OrderContext.js
// import React, { createContext, useContext } from "react";

// const OrderContext = createContext();

// export const useOrder = () => useContext(OrderContext);

// export const OrderProvider = ({ children, handleFirstSubmit }) => {
//   return (
//     <>
//       <OrderContext.Provider value={{ handleFirstSubmit }}>
//         {children}
//       </OrderContext.Provider>
//     </>
//   );
// };

import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children, handleFirstSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleSelect = () => {
    const newIndex = !currentIndex;
    setCurrentIndex(newIndex);
    setShow2(newIndex);
  };
  const handleClose2 = () => {
    setShow2(false);
    setCurrentIndex(false);
  };
  return (
    <OrderContext.Provider
      value={{ handleFirstSubmit, handleSelect,handleClose2, currentIndex, show2 }}
    >
      {children}
    </OrderContext.Provider>
  );
};


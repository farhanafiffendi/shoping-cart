import { AppRouter } from './AppRouter'
import React, { useState, useEffect } from 'react'

export const ShoppingCartContext = React.createContext();

function App() {
  const cartState = useState(() => {
    const cartInLocalStorage = localStorage.getItem("cart");
    return cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState[0]));
  }, cartState);


  return (
    <div className="App">
      <ShoppingCartContext.Provider value={cartState}>
        <AppRouter />
      </ShoppingCartContext.Provider>
    </div>
  );
}

export default App;

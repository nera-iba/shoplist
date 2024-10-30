// src/App.jsx - Central komponent til at styre tilstande og integrationer for shop manager
import { useState, useEffect } from 'react';
import ShopInput from './ShopInput'; // Importere ShopInput-komponent
import ShopList from './ShopList';   // Importere ShopList-komponent
import './App.css';

function App() {
  const storedShopItems = JSON.parse(localStorage.getItem('shopItems')) || [];
  const storedShops = JSON.parse(localStorage.getItem('shops')) || [];
  
  const [shopItems, setShopItems] = useState(storedShopItems);
  const [shops, setShops] = useState(storedShops);

  // Opdater localStorage når shopItems ændres
  useEffect(() => {
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
  }, [shopItems]);

  // Opdater localStorage når shops ændres
  useEffect(() => {
    localStorage.setItem('shops', JSON.stringify(shops));
  }, [shops]);

  // Funktion til at tilføje en ny vare til en bestemt butik
  const addShopItem = (itemName, itemPriority, itemShop) => {
    const newShopItem = {
      id: Date.now(),
      name: itemName,
      completed: false,
      priority: itemPriority || 'low',
      shop: itemShop || 'General' // Brug "General" som fallback-shop hvis ingen valgt
    };
    setShopItems([...shopItems, newShopItem]);
  };

  // Funktion til at tilføje en ny butik
  const addShop = (shopName) => {
    if (!shops.includes(shopName)) {
      setShops([...shops, shopName]); // Tilføjer butikken til shops-arrayet
    }
  };

  // Funktion til at fjerne en vare baseret på ID
  const removeShopItem = (id) => {
    setShopItems(shopItems.filter(shopItem => shopItem.id !== id));
  };

  // Funktion til at slette alle varer og butikker
  const removeAllShopItems = () => {
    const confirmed = window.confirm("Are you sure you want to delete all items and shops?");
    if (confirmed) {
      setShopItems([]);      // Sletter alle varer
      setShops([]);          // Sletter alle butikker
      localStorage.removeItem('shopItems'); // Fjerner også data fra localStorage
      localStorage.removeItem('shops');     // Fjerner også butikker fra localStorage
    }
  };

  // Funktion til at markere en vare som færdig/ufærdig
  const toggleShopItemCompletion = (id) => {
    setShopItems(shopItems.map(shopItem => 
      shopItem.id === id ? { ...shopItem, completed: !shopItem.completed } : shopItem
    ));
  };

  return (
    <div className="app">
      <h1>Shop Manager</h1>
      <ShopInput addShopItem={addShopItem} addShop={addShop} shops={shops} />
      <ShopList 
        shopItems={shopItems} 
        removeShopItem={removeShopItem} 
        toggleShopItemCompletion={toggleShopItemCompletion}
      />
      <button onClick={removeAllShopItems} className="delete-all">Delete All Items and Shops</button>
    </div>
  );
}

export default App;
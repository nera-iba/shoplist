// src/ShopInput.jsx - Denne komponent bruges til at tilføje varer og butikker. Brugeren kan indtaste en vare, vælge afdeling, og tilknytte en butik til en vare
import { useState } from 'react';

function ShopInput({ addShopItem, addShop, shops }) {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('');
  const [shopName, setShopName] = useState('');
  const [selectedShop, setSelectedShop] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && priority && selectedShop) {
      console.log('Tilføjer vare til butik:', selectedShop);  // Debugging for at sikre korrekt butiksnavn
      addShopItem(inputValue, priority, selectedShop);
      setInputValue('');
      setPriority('');
      setSelectedShop('');
    }
  };

  const handleShopSubmit = (e) => {
    e.preventDefault();
    if (shopName.trim()) {
        console.log("Tilføjer butik:", shopName);  
      addShop(shopName);
      setShopName('');
    }
  };

//Opsætning af inputfelter til at tilføje en ny butik og en ny vare
  return (
    <>
      <form onSubmit={handleShopSubmit}>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Tilføj ny butik"
        />
        <button type="submit">Tilføj butik</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tilføj ny vare"
        />

        {/* Prioritetsvalg */}
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="" disabled hidden>Vælg afdeling</option>
          <option value="frugt/grønt">Frugt/Grønt</option>
          <option value="brød">Brød</option>
          <option value="kød">Kød</option>
          <option value="konserves">Konserves</option>
          <option value="nonfood">NonFood</option>
          <option value="mejeri">Mejeri</option>
          <option value="frost">Frost</option>
        </select>

        {/* Projektvalg - sørg for nyeste projekter er nederst */}
        <select 
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
          required
        >
          <option value="" disabled hidden>Vælg butik</option>
          {shops.map((shop, index) => (
            <option key={index} value={shop}>{shop}</option>
          ))}
        </select>

        <button type="submit">Tilføj</button>
      </form>
    </>
  );
}

export default ShopInput;
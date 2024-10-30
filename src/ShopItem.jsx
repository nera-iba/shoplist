//håndterer visningen og interaktionen for hver enkelt opgave. Det er ansvarligt for at vise opgavens detaljer som navn, prioritet og status, samt håndtere brugerens interaktioner som at markere opgaven som færdig.
import './App.css';

function ShopItem({ shopItem, removeShopItem, toggleShopItemCompletion}) {

  const handleCompleteClick = (id) => {
    if (!shopItem.completed) {
      toggleShopItemCompletion(id);
    }
  };

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm("Er du sikker på du ønsker at slette?");
    if (confirmed) {
      removeShopItem(id);
    }
  };
  
// opsætning af knapper til at markere en opgave som færdig eller slette en opgave
  return (
    <li className={`shop-item ${shopItem.completed ? 'completed' : ''}`}>
      <span>{shopItem.name}</span> {/* Opgavens navn uden farveændring */}
      <span className={`priority-${shopItem.priority}`}> - Afdeling: {shopItem.priority}</span> 

      <button onClick={() => handleCompleteClick(shopItem.id)} className={`complete ${shopItem.completed ? 'active' : ''}`}>
        {shopItem.completed ? 'Undo' : 'Complete'}
      </button>

      <button onClick={() => handleDeleteClick(shopItem.id)} className="delete">
        Delete
      </button>
    </li>
  );
}

export default ShopItem;
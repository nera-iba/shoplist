// ShopList.jsx er udelukkende ansvarlig for at vise opgaverne
import ShopItem from './ShopItem';

// Definer rækkefølge for afdelingerne
const departmentOrder = {
  "frugt/grønt": 1,
  "brød": 2,
  "kød": 3,
  "mejeri": 4,
  "konserves": 5,
  "frost": 6,
  "nonfood": 7
  // Tilføj flere afdelinger efter behov
};

function ShopList({ shopItems, removeShopItem, toggleShopItemCompletion }) {
  // Sorter shopItems efter afdeling og completed-status
  const sortedShopItems = shopItems.sort((a, b) => {
    // Sorter først efter om varen er completed
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;  // Færdiggjorte opgaver nederst
    }

    // Sorter efter afdeling baseret på deres rang i departmentOrder
    return departmentOrder[a.priority] - departmentOrder[b.priority];
  });

  // Grupper shopItems efter butik
  const groupedShopItems = sortedShopItems.reduce((acc, shopItem) => {
    if (!acc[shopItem.shop]) {
      acc[shopItem.shop] = [];
    }
    acc[shopItem.shop].push(shopItem);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedShopItems).map((shop) => (
        <div key={shop}>
          <h2>{shop}</h2> {/* Butikkens navn som overskrift */}
          <ul>
            {groupedShopItems[shop].map((shopItem) => (
              <ShopItem
                key={shopItem.id}
                shopItem={shopItem}
                removeShopItem={removeShopItem}
                toggleShopItemCompletion={toggleShopItemCompletion}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShopList;
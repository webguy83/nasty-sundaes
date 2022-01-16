import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utils/generic';

const OrderDetails = createContext();

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
  }

  return context;
}

function calcSubTotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubTotal = calcSubTotal('scoops', optionCounts);
    const toppingsSubTotal = calcSubTotal('toppings', optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;

    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const val = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];

      if (parseInt(newItemCount) === 0) {
        optionCountsMap.delete(itemName);
      } else {
        optionCountsMap.set(itemName, parseInt(newItemCount));
      }

      setOptionCounts(newOptionCounts);
    }
    return [{ ...optionCounts, totals, updateItemCount, setOptionCounts }];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={val} {...props} />;
}

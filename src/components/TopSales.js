import { useLazyGetTopSalesQuery } from '../api/products';
import { useEffect } from 'react';
import ProductItem from './ProductItem';
import Preloader from './Preloader';

const TopSales = () => {
  const [fetchTopSales, { data = [], isLoading, isError }] = useLazyGetTopSalesQuery();

  useEffect(() => {
    fetchTopSales();
  }, [fetchTopSales]);

  if (isError) {
    return <p>Произошла ошибка</p>
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {
        isLoading ? <Preloader /> : <div className="row">
          {
            data.map((item) => <ProductItem key={item.id} item={item}/>)
          }
        </div>
      }
    </section>
  );
};

export default TopSales;

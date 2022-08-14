import CategoriesList from './CategoriesList';
import ProductItem from './ProductItem';
import Preloader from './Preloader';
import useProducts from '../hooks/useProducts';
import Search from './Search';

const Catalog = ({showSearch = false}) => {
  const {
    products,
    search,
    isFetching,
    isLastPage,
    isError,
    activeCategory,
    setOffset,
    searchParams,
    setSearchParams,
  } = useProducts();

  const handleCategoryChange = (categoryId) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, categoryId });
  };

  const handleSearchSubmit = (search) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, search });
  };

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {
        showSearch && <Search onSubmit={handleSearchSubmit} search={search}/>
      }
      <CategoriesList onCategoryChange={handleCategoryChange} activeCategory={activeCategory} />
      <div className="row">
        {
          products.map((item) => <ProductItem item={item} key={item.id}/>)
        }
        {
          products.length === 0 && !isFetching && <>Ничего не найдено</>
        }
      </div>
      { isFetching && <Preloader/> }
      {
        !isLastPage && products.length > 0 && <div className="text-center">
          <button className="btn btn-outline-primary" onClick={() => setOffset(products.length)}>Загрузить ещё</button>
        </div>
      }
    </section>
  );
};

export default Catalog;

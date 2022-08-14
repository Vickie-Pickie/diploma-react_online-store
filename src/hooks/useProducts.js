import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useLazyGetCategoryItemsQuery } from '../api/products';
import { useSearchParams } from 'react-router-dom';

const useProducts = () => {
  const [fetchCategoryItems, { data, isFetching, isError }] = useLazyGetCategoryItemsQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const loadProducts = () => {
    fetchCategoryItems({
      categoryId: activeCategory,
      offset,
      q: search,
    });
  };

  useEffect(() => {
    loadProducts();
  }, [offset, activeCategory, search]);

  useEffect(() => {
    if (!data) {
      return
    }

    setProducts([...products, ...data]);

    if (data.length < 6) {
      setIsLastPage(true);
    }
  }, [data]);

  const changeCategory = useCallback((categoryId) => {
    setProducts([]);
    setOffset(0);
    setIsLastPage(false);
    setActiveCategory(categoryId);
  });

  const changeSearch = useCallback((search) => {
    setSearch(search);
    setOffset(0);
    setProducts([]);
    setIsLastPage(false);
  });

  useEffect(() => {
    if (searchParams.has('search') && search !== searchParams.get('search')) {
      changeSearch(searchParams.get('search') || '');
    }

    if (searchParams.has('categoryId') && activeCategory !== Number(searchParams.get('categoryId'))) {
      changeCategory(Number(searchParams.get('categoryId')));
    }
  }, [searchParams]);

  return {
    products,
    search,
    isFetching,
    isLastPage,
    isError,
    activeCategory,
    changeCategory,
    setOffset,
    setSearch,
    setProducts,
    searchParams,
    setSearchParams,
  }
};

export default useProducts

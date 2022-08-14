import { useLazyGetListCategoriesQuery } from '../api/products';
import { useEffect } from 'react';
import CategoryItem from './CategoryItem';

const CategoriesList = ({onCategoryChange, activeCategory}) => {
  const [fetchCategories, {data: categories = [], isLoading, isError }] = useLazyGetListCategoriesQuery();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = (e, id) => {
    e.preventDefault();
    onCategoryChange(id);
  };

  if(isError) {
    return <p>Произошла ошибка</p>
  }

  return (
    <>
      {
      !isLoading && <ul className="catalog-categories nav justify-content-center">
        <CategoryItem key={0}
                      title={'Все'}
                      onClick={(e) => handleCategoryClick(e, 0)}
                      isActive={activeCategory === 0}
        />
        {
          categories.map((item) => <CategoryItem
            key={item.id}
            title={item.title}
            onClick={(e) => handleCategoryClick(e, item.id)}
            isActive={activeCategory === item.id}
          />)
        }
      </ul>
    }
    </>
  );
};

export default CategoriesList;

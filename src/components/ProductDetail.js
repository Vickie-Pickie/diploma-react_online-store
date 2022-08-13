import { useLazyGetProductDetailQuery } from "../api/products";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Preloader from "./Preloader";
import {useDispatch} from "react-redux";
import cart from '../slices/cart';

const ProductDetail = () => {
  const [fetchProductDetail, {data, isFetching, isError}] = useLazyGetProductDetailQuery();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);

  if (!data || isFetching) {
    return <Preloader />;
  }

  if (isError) {
    return <p>Произошла ошибка</p>
  }

  const availableSizes = data.sizes.filter((item) => item.avalible);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(cart.actions.addToCart({
      product: data,
      size: selectedSize,
      quantity: count,
    }));
    navigate('/cart');
  };

  return (
    <section className="catalog-item">
      <h2 className="text-center">{data.title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={data.images[0]}
               className="img-fluid" alt={data.title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
            <tr>
              <td>Артикул</td>
              <td>{data.sku}</td>
            </tr>
            <tr>
              <td>Производитель</td>
              <td>{data.manufacturer}</td>
            </tr>
            <tr>
              <td>Цвет</td>
              <td>{data.color}</td>
            </tr>
            <tr>
              <td>Материалы</td>
              <td>{data.material}</td>
            </tr>
            <tr>
              <td>Сезон</td>
              <td>{data.season}</td>
            </tr>
            <tr>
              <td>Повод</td>
              <td>{data.reason}</td>
            </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии:
              {
                availableSizes.map((item) => {
                  let sizeClass = '';
                  if (item.size === selectedSize) {
                    sizeClass = 'selected';
                  }
                  return <span key={item.size} className={`catalog-item-size size-item ${sizeClass}`} onClick={() => setSelectedSize(item.size)}>{item.size}</span>
                })
              }
              {
                availableSizes.length === 0 && 'Нет доступных размеров'
              }
            </p>
            <p>
              {
                availableSizes.length !== 0 && <>
                  Количество: <span className="btn-group btn-group-sm pl-2">
                <button className="btn btn-secondary" onClick={handleDecrease}>-</button>
                <span className="btn btn-outline-primary">{count}</span>
                <button className="btn btn-secondary" onClick={handleIncrease}>+</button>
                </span>
                </>
              }
            </p>
          </div>
          {
            availableSizes.length !== 0 && <button className="btn btn-danger btn-block btn-lg" disabled={!selectedSize} onClick={handleAddToCart}>В корзину</button>
          }
        </div>
      </div>
    </section>
  )
};

export default ProductDetail;

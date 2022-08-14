import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from "react-router-dom";
import cart from '../slices/cart';
import OrderForm from './OrderForm';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const handleDelete = (i) => {
    dispatch(cart.actions.deleteItem(i));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
          </thead>
          <tbody>
          {
            items.map((item, i) => <tr key={item.productId + item.size}>
              <td scope="row">{i+1}</td>
              <td><Link to={`/catalog/${item.productId}`}>{item.title}</Link></td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>{item.price} руб.</td>
              <td>{item.price * item.quantity} руб.</td>
              <td>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(i)}>Удалить</button>
              </td>
            </tr>)
          }
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{totalAmount} руб.</td>
          </tr>
          </tbody>
        </table>
      </section>
      <OrderForm />
    </>
  )
};

export default Cart;

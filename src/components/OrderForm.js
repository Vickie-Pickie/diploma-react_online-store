import { useState } from 'react';
import { useCreateOrderMutation } from '../api/order';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import Preloader from './Preloader';
import cart from '../slices/cart';

const OrderForm = () => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isAgree, setIsAgree] = useState(false);
  const items = useSelector(state => state.cart.items);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const [createOrder, { isSuccess, isLoading, isError }] = useCreateOrderMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !address || !isAgree) {
      setError('Необходимо заполнить все поля');
      return;
    }

    await createOrder({
      owner: {
        phone,
        address,
      },
      items: items.map((item) => ({
        id: item.productId,
        price: item.price,
        count: item.quantity,
      })),
    });

    dispatch(cart.actions.clearCart());
  };

  const displayForm = () => {
    if (isLoading) {
      return <Preloader />
    }

    if (isSuccess) {
      return <p>Заказ успешно оформлен</p>
    }

    if(isError) {
      return <p>Произошла ошибка</p>
    }

    return <form className="card-body" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="phone">Телефон</label>
        <input className="form-control" id="phone" placeholder="Ваш телефон" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="address">Адрес доставки</label>
        <input className="form-control" id="address" placeholder="Адрес доставки" value={address} onChange={(e) => setAddress(e.currentTarget.value)} />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="agreement" checked={isAgree} onChange={(e) => setIsAgree(e.currentTarget.checked)} />
        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
      </div>
      {
        error && <div className="form-group error">{error}</div>
      }
      <button type="submit" className="btn btn-outline-secondary" disabled={!isAgree}>Оформить</button>
    </form>
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{maxWidth: '30rem', margin: '0 auto' }}>
        {displayForm()}
      </div>
    </section>
  );
};

export default OrderForm;

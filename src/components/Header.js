import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
  const items = useSelector(state => state.cart.items);
  const [menu] = useState([
    {
      url: '/',
      label: 'Главная',
    },
    {
      url: '/catalog',
      label: 'Каталог',
    },
    {
      url: '/about',
      label: 'О магазине',
    },
    {
      url: '/contacts',
      label: 'Контакты',
    },
  ]);

  const [visibilitySearch, setVisibilitySearch] = useState('invisible');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchIconClick = () => {
    if (visibilitySearch === 'invisible') {
      setVisibilitySearch('');
    } else {
      setVisibilitySearch('invisible');
      if (inputValue) {
        navigate({pathname: '/catalog', search: `?search=${inputValue}`});
      }
      setInputValue('');
    }
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">
              <img src="/images/header-logo.png" alt="Bosa Noga"/>
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {
                  menu.map((item) => <MenuItem key={item.label} item={item} />)
                }
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleSearchIconClick}></div>
                  <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
                    {
                      items.length > 0 && <div className="header-controls-cart-full">{items.length}</div>
                    }
                    <div className="header-controls-cart-menu"></div>
                  </div>
                </div>
                <form data-id="search-form" className={`${visibilitySearch} header-controls-search-form form-inline`}>
                  <input className="form-control" placeholder="Поиск" value={inputValue} onChange={onInputChange}/>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

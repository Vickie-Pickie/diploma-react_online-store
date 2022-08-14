import { NavLink } from 'react-router-dom';

const MenuItem = ({item}) => {
  return (
    <li className="nav-item">
      <NavLink to={item.url} className="nav-link" >{item.label}</NavLink>
    </li>
  );
};

export default MenuItem;

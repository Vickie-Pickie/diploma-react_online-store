const CategoryItem = ({title, onClick, isActive}) => {
  let linkClass = 'nav-link';
  if (isActive) {
    linkClass += ' active';
  }
  return (
    <li className="nav-item">
      <a className={linkClass} href="#" onClick={onClick}>{title}</a>
    </li>
  );
};

export default CategoryItem;

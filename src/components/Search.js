import {
  useEffect,
  useState,
} from 'react';

const Search = ({onSubmit, search}) => {
  const [input, setInput] = useState(search);

  useEffect(() => {
    setInput(search);
  }, [search])
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input className="form-control" placeholder="Поиск" onChange={handleChange} value={input}/>
    </form>
  );
};

export default Search;

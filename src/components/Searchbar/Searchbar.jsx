import { useState } from 'react';
import { Header } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

const Searchbar = props => {
  const [query, setQuery] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return alert('Не можна зробити запит по пустій квері');
    }
    props.onSubmit(query);
    setQuery('');
  };

  return (
    <Header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
          <ImSearch />
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
        />
      </form>
    </Header>
  );
};
export default Searchbar;

import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

export function SearchInputCTX({ children }) {
  const [query, setQuery] = useState(null);

  const searchHandler = (query) => {
    setQuery(query);
  };

  return (
    <Context.Provider
      value={{
        query,
        searchHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useSearchInputCTX() {
  return useContext(Context);
}

SearchInputCTX.propTypes = {
  children: PropTypes.node.isRequired,
};

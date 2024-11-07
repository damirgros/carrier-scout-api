import { useState } from "react";
import styles from "../styles/Home.module.scss";

interface SearchProps {
  onSearch: (searchData: { query: string }) => void;
}

const SearchForm: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        placeholder="Job title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.inputField}
      />

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;

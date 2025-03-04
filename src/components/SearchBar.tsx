import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface Color {
  color: string;
}

export const SearchBar = ({ setResults }: { setResults: (results: Color[]) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (value: string) => {
    setSearchTerm(value);

    // Use the value parameter directly in the filter function
    fetchData(value);
  };

  const fetchData = (term: string) => {
    fetch("sampleData.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        const results = json.filter((color: { color: string }) => {
          return color && color.color && color.color.toLowerCase().includes(term.toLowerCase());
        });
        setResults(results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResults([]); // Set results to an empty array in case of an error
      });
  };

  return (
    <div className=' text-white'>
      <FontAwesomeIcon icon={faSearch} className="search-icon text-white" />
      <input
        type="text"
        id="searchInput" 
        placeholder="lookup color..."
        value={searchTerm}
        onChange={(e) => handleChange(e.target.value)}
        className="focus:outline-none placeholder:text-white focus:border-none bg-transparent text-white pl-8"
      />
    </div>
  );
};
 

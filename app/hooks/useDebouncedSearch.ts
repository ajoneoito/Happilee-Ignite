import {useState, useEffect} from 'react';

const useDebouncedSearch = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};

export default useDebouncedSearch;

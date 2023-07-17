import {useState, useRef} from 'react';

const useStateRef = (initalState: any) => {
  const [state, setState] = useState(initalState);
  const ref = useRef(initalState);
  const setStateRef = (newState: any) => {
    try {
      setState(newState);
      if (typeof newState !== 'undefined') {
        ref.current = newState;
      }
    } catch (error) {}
  };
  return [state, setStateRef, ref];
};

export default useStateRef;

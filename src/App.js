// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDiscs } from './discSlice';



function App() {

  const dispatch = useDispatch();

  const discSpeed = 9;

  useEffect(() => {
    fetchDiscs(dispatch, discSpeed);
  }, [dispatch]);

  return (
    <div className="App">
      <span> Hello </span>
    </div>
  );
}

export default App;


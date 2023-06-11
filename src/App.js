// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDiscs } from './discSlice';



function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    fetchDiscs(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <span> Hello
        {console.log("HEllo")}
      </span>
    </div>
  );
}

export default App;


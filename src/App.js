import React from "react";
import { useSelector, useDispatch } from "react-redux";

import{Routes,Route,} from "react-router-dom"
import './scss/app.scss'
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { decrement, increment } from './redux/slices/filterSlice'


export const SearchContext = React.createContext()

function App() {
const [searchValue, setSearchValue] = React.useState('');
const filter = useSelector((state) => state.filter.value)
const dispatch = useDispatch()

  return (
    <div className="wrapper">

      <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{filter}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>



      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <Header />
    <div className="content">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
      </SearchContext.Provider>
  </div>
  );
}

export default App;

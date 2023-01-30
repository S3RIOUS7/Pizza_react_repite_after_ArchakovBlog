import React from 'react'


import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { setCategoryId } from '../redux/slices/filterSlice'
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux'

 const Home = ( ) => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({name: 'популярности', sortProperty: 'rating',});
  const onChangeCategory = (id) => { dispatch(setCategoryId(id)) }
  

React.useEffect(() => {
  setIsLoading(true);
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sortType.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '' ;
  const search = searchValue ? `&search=${searchValue}` : '' ;

   fetch(`https://63bfda05e262345656f1a0a8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
  .then((res) => {
    return res.json();
  })
  .then((arr) => {
    setItems(arr);
    setIsLoading(false);
  });
  window.scrollTo(0, 0)
}, [categoryId, sortType, searchValue, currentPage]);
  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  return (
    <div className='container'>
    <div className="content__top">
    <Categories value = {categoryId} onChangeCategory={onChangeCategory} />
    <Sort value = {sortType} onChangeSort={(i) => setSortType(i)} />
  </div>
  <h2 className="content__title">Все пиццы</h2>
  <div className="content__items">
    {isLoading ? skeletons : pizzas }</div>
    <Pagination onChangePage={(number) => {setCurrentPage(number)}} /> 
  </div>
  );
}

export default Home;
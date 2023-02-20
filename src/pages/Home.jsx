import React from 'react';

import qs from 'qs'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sortList } from "../components/Sort";
import { fetchPizzas } from '../redux/slices/pizzaSlice';


 const Home = ( ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

 const items = useSelector((state) => state.pizza.items);
  const { categoryId, sort, currentPage} = useSelector((state) => state.filter);
 
  

  const {searchValue} = React.useContext(SearchContext);
  
  const [isLoading, setIsLoading] = React.useState(true);
  
  const onChangeCategory = (id) => { dispatch(setCategoryId(id)) }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

const getPizzas = async () => {
  setIsLoading(true);

  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.sortProperty.replace('-', '');
  const category = categoryId > 0 ? `category=${categoryId}` : '' ;
  const search = searchValue ? `&search=${searchValue}` : '' ;

 try {
  dispatch(fetchPizzas({
    order,
    sortBy,
    category,
    search,
    currentPage,
  }));
  setIsLoading(false);
}catch (error) {
  alert ('Error');
} finally {
  setIsLoading(false);
}
    
  window.scrollTo(0, 0);
}


React.useEffect(() => {
  if(isMounted.current) {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }
  isMounted.current = true;
}, [categoryId, sort.sortProperty, searchValue, currentPage])

  
React.useEffect(() => {
  if (window.location.search){
    const params = qs.parse(window.location.search.substring(1));

    const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

    dispatch(setFilters({
      ... params,
      sort,
    }),);
    isSearch.current = true;
  }
}, [])

React.useEffect(() => {
  window.scrollTo(0, 0)

  if(!isSearch.current){
    getPizzas();
  }

  isSearch.current = false;

}, [categoryId, sort.sortProperty, currentPage]);

 
  const pizzas = items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  return (
    <div className='container'>
    <div className="content__top">
    <Categories value = {categoryId} onChangeCategory={onChangeCategory} />
    <Sort />
  </div>
  <h2 className="content__title">Все пиццы</h2>
  <div className="content__items">
    {isLoading ? skeletons : pizzas }</div>
    <Pagination currentPage={currentPage} onPageChange={onChangePage} /> 
  </div>
  );
}

export default Home;
import React from 'react';

import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sortList } from "../components/Sort";
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';


 const Home = ( ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

 const { items, status} = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
 
  
  
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

  dispatch(
    fetchPizzas({
    order,
    sortBy,
    category,
    search,
    currentPage,
  }));
    
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
  console.log(searchValue)
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

 
  const pizzas = items.map((obj) => (
  <Link key={obj.id} to ={`/pizza/${obj.id}`}>
    <PizzaBlock {...obj} />
    </Link>
    ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  return (
    <div className='container'>
    <div className="content__top">
    <Categories value = {categoryId} onChangeCategory={onChangeCategory} />
    <Sort />
  </div>
  <h2 className="content__title">?????? ??????????</h2>
  {
    status === 'error' ? (
    <div className='content__error-info'>
      <h2> ?????????????????? ???????????? ????</h2>
      <p>?? ??????????????????, ???? ?????????????? ???????????????????? ??????????. ???????????????????? ?????????????????? ?????????????? ??????????.</p>
    </div>
    ) : (<div className="content__items"> {status === 'loading' ? skeletons : pizzas }</div>)
  }
  
    <Pagination currentPage={currentPage} onPageChange={onChangePage} /> 
  </div>
  );
}

export default Home;
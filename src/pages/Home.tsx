import React from 'react';

import qs from 'qs'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';
 


 
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncAction';



 const Home: React.FC = ( ) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);



 const { items, status} = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
 
  
  
  const [isLoading, setIsLoading] = React.useState(true);
  
  const onChangeCategory = React.useCallback((idx: number) => { dispatch(setCategoryId(idx)) },[]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
    currentPage: String(currentPage),
  }));
    
  window.scrollTo(0, 0);
}


// React.useEffect(() => {
//   if(isMounted.current) {
//     const params = {
//       categoryId: categoryId > 0 ? categoryId : null,
//       sortProperty: sort.sortProperty,
//       currentPage,
//     };

//     const queryString = qs.stringify(params, {skipNulls: true});

//     navigate(`/?${queryString}`);
//   }

//   if (!window.location.search) {
    
//   dispatch(fetchPizzas({} as SearchPizzaParams));
//   }
// }, [categoryId, sort.sortProperty, searchValue, currentPage]);

React.useEffect(() => {
  window.scrollTo(0, 0)

  if(!isSearch.current){
    getPizzas();
  }

  // isSearch.current = false;

}, [categoryId, sort.sortProperty, searchValue, currentPage]);

// React.useEffect(() => {
//   if (window.location.search){
//     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;

//     const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
//    dispatch(setFilters({
//     searchValue: params.search,
//     categoryId: Number(params.category),
//     currentPage: Number(params.currentPage),
//     sort: sort ? sort : sortList[0],
//    })); 
//   }
//   isSearch.current = true;
// }, [])


 
  const pizzas = items.map((obj: any) => (
  
    <PizzaBlock key = {obj.id} {...obj} />
   
    ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
  return (
    <div className='container'>
    <div className="content__top">
    <Categories value = {categoryId} onChangeCategory={onChangeCategory} />
    <Sort value = {sort} />
  </div>
  <h2 className="content__title">Все пиццы</h2>
  {
    status === 'error' ? (
    <div className='content__error-info'>
      <h2> Произошла ошибка 😕</h2>
      <p>К сожалению, не удалось отобразить пиццы. попробуйте повторить попытку позже.</p>
    </div>
    ) : (<div className="content__items"> {status === 'loading' ? skeletons : pizzas }</div>)
  }
  
    <Pagination currentPage={currentPage} onPageChange={onChangePage} /> 
  </div>
  );
}

export default Home;
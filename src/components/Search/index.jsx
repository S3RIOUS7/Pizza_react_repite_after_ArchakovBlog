import React from 'react';
import { SearchContext } from '../../App';

import styles from './Search.module.scss'

 const Search = () => {
   const {searchValue, setSearchValue} = React.useContext(SearchContext);
   const inputRef = React.useRef();

   const onClickClear = () => {
     setSearchValue('');
    
     inputRef.current.focus();
   };
   
  return (
    <div className={styles.root}><svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="Layer 2" id="Layer_2"><path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/></g></svg>
    <input ref={inputRef} value={searchValue} onChange={event => setSearchValue(event.target.value) } className={styles.input} placeholder='Поиск пиццы ...' /> 
    {searchValue && (
    <svg onClick={onClickClear} className={styles.clearIcon}  viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>)}
    </div>
    
  )
}
export default Search;
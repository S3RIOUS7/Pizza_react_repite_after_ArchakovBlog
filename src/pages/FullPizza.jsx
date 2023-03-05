import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

 const FullPizza = () => {
     const { id } = useParams();

     const [pizza, setPizza] = React.useState();

     React.useEffect(() => { async function fetchPizza(){
      try{
        const {data} = await axios.get('https://63bfda05e262345656f1a0a8.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {alert('Ошибка при получении запроса')}
      }
      fetchPizza();
     }, []);

if (!pizza) {
  return 'Загрузка...'
}

  return (
    <div className='container'>
        <img src={pizza.imageUrl} />
        <h2>{pizza.title}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque a praesentium totam molestiae odit veniam id tempora quaerat aspernatur recusandae. Facere, maxime itaque! Eveniet impedit animi temporibus minima harum itaque?</p>
        <h4>{pizza.price} грн</h4>
    </div>
  )
}

export default FullPizza; 
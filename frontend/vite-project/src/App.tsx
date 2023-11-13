
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';

type product ={
id:number,
title:string,
price:number
}

async function App() {
 const [products , setProducts]=useState([]) 

const fetchProducts = async()=>{
const {data}= await axios.get('http://localhost:8084/products')
setProducts(data.payload)
} 

const handelDelete = async(id:number)=>{
  await axios.delete(`http://localhost:8084/products/${id}`)
  fetchProducts();
  } 
  useEffect(()=>{
    fetchProducts();
  },[])


return(
<div>
  <div>
    {products && products.length > 0 && products.map((product:product)=>{
      return (
        <div key={product.id}>
        <h3>{product.title}</h3>
        <h3>{product.price}</h3>
        <button onClick={() => {handelDelete(product.id)}}>-</button>
        </div>
      )
    })}
  </div>
</div>
)

 }

export default App

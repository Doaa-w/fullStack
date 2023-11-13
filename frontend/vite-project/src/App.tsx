
import { useEffect, useState ,ChangeEvent , FormEvent} from 'react';
import './App.css'
import axios from 'axios';

type product ={
id:string,
title:string,
price:number
}

 function App() {
 const [products , setProducts]=useState([]); 
 const [product , setProduct]=useState({
  title: '',
  price: 0
 }); 
const fetchProducts = async () =>{
const {data}= await axios.get('http://localhost:8084/products')
setProducts(data.payload)
console.log(data)
} 

const handelDelete = async(id:number)=>{
  await axios.delete(`http://localhost:8084/products/${id}`)
  fetchProducts();
  } 
  const createProduct = async(product)=>{
    await axios.post('http://localhost:8084/products/' , product)
    fetchProducts();
    } 
  useEffect(()=>{
    fetchProducts();
  },[])
const handelChange=(event:ChangeEvent<HTMLInputElement>)=>{
setProduct((prevState)=>{
  return {... prevState , [event.target.name]: event.target.value}
})
}
const handelSubmit =(event: FormEvent )=>{
  event.preventDefault();
  createProduct(product);
  setProduct({
    title: '',
  price: 0
  })

}

return(
<div>
  <form onSubmit={handelSubmit} className='form'>
    <input type='text' value={product.title} name='title' placeholder='enter title ' onChange={handelChange}/><br/>
    <input type='text' value={product.price} name='price' placeholder='enter price ' onChange={handelChange}/><br/>
    <button type='submit'>create</button>
  </form>
  <div  className='products'>
    {products.length > 0 && products.map((product:product)=>{
      return (
        <div key={product.id} className='product'>
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

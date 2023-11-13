import express from "express";
import cors from "cors";
import ids from "ids";
import { creatProductValidation,
     productValidation, 
     updateValidation } from "./productVal.js";
import { runValidation } from "./run.js";

let products = [
 
{id: '1' , title: 'laptop' , price: 750}, 
{id: '2' , title: 'smartphone' , price: 699}, 
{id: '3' , title: 'tablet' , price: 600}, 
{id: '4' , title: 'laptop 2' , price: 750}, 
{id: '5' , title: 'smartphone 2' , price: 699}, 
{id: '6' , title: 'tablet 2' , price: 600},
]

const PORT = '8084';
const app = express();


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


// app.use((req,res,next)=>{
//     res.status(404).json({
//         message: 'route not found'
//     })
// })

app.get('/', (req , res)=>{
    try {
      res.status(200).send('Hello, World!')  
    } catch (error) {
        res.status(500).send('server error')
    }

})

app.get('/products/:id' ,productValidation,runValidation, (req,res)=>{
    const id = req.params.id;
    const product= products.find((product)=> product.id === id);
    if(!product){
        const error = new Error (`product with ${id} not found`)
        error.status =404
        throw error
    }
        res.status(200).send({
            sucsess: true,
            message:' product is here',
            payload: product,
        })  
})

app.post('/', (req,res) =>{
    try {
        res.status(200).send('Creat a product') 
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.delete('/products/:id' , productValidation , runValidation ,(req , res )=>{
    try {
        const id = req.params.id;
        const product= products.find((product)=> product.id === id);
        if(!product){
            const error = new Error (`product with ${id} id not found`)
            error.status =404
            throw error
        }
        const filteredProducts=products.filter((product)=> product.id !==id)
        products = filteredProducts
        res.status(200).send({
            sucsess: true,
            payload: filteredProducts, 
        })
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.get('/products', (req , res)=>{
  
    res.status(200).send({
        sucsess: true,
        payload: products,
    })
    
    return;
    })

app.post('/products',creatProductValidation, runValidation, (req,res) =>{
    if(!req.body.title){
        return res.status(404).json({message: 'title is missing'})
    }
    if(!req.body.price){
        return res.status(404).json({message: 'price is missing'})
    }

    try {
    const {title , price} = req.body;
     const newProduct= {
        id: ids(),
        title: title ,
        price: price ,
    }
    products.push(newProduct);
    res.status(201).send({
        sucsess: true,
        payload: newProduct, 
    })    
    } catch (error) {
        res.status(500).send({
            sucsess: false,
            message: "server error"
        })
    }
    
    return;
})

app.put('/products/:id',productValidation,updateValidation,runValidation, (req,res ,next) =>{
try {
    const id = req.params.id;
    const {title , price} = req.body;
    const indexProduct = products.findIndex((product)=> product.id === id);
    if(indexProduct == -1){
        const error = new Error (`product with ${id} is not found`)
        error.status =404
        throw error
    }
    products[indexProduct].title=title
    products[indexProduct].price=price
    res.status(201).json({
        sucsess: true,
        message: 'product is updated', 
        
    })  
} catch (error) {
   next()
}
})

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'route not found'
    })
})
app.use((err,req,res,next)=>{
    res.status(err.status||500).json({
        message: err.message|| 'route not found'
    })
})

app.listen(PORT,()=>{
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
})
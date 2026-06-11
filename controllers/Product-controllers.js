import {v2 as cloudinary} from 'cloudinary';
import product_model from '../models/product-models.js';


export const add_item = async (req, res) => {

    try {
    const {name,description,price,category,subcategory,size,bestseller}=req.body;

    
    const image1= req.files.image1 && req.files.image1[0];
    const image2= req.files.image2 && req.files.image2[0];
    const image3= req.files.image3 && req.files.image3[0];
    const image4= req.files.image4 && req.files.image4[0];

    const images=[image1,image2,image3,image4].filter((item)=> item !== undefined);

    let images_url= await Promise.all(
        images.map(async(item)=>{
            let result= await cloudinary.uploader.upload(item.path,{resource_type:'image'})
            return result.secure_url;
            

        })
    )

    let product_data={
        name:name,
        description:description,
        category:category,
        price:Number(price),  
        subcategory:subcategory,
        bestseller:bestseller , 
        image:images_url,
        size:JSON.parse(size),
        date:Date.now()
        
    }
    console.log(images_url)
    const product= new product_model(product_data);
    await product.save()
    res.send('sucess')

        
    } catch (error) {
        res.json({sucess:false,message:error})
        
        
    }

   

}

export const remove_product = async (req, res) => {
   try {
    await product_model.findByIdAndDelete(req.body.id)
    res.json({sucess:true, message:"Product Remove"})
    
   } catch (error) {
    res.json({sucess:false,message:error.message})
   }

}

export const list_product = async (req, res) => {
    try {

        const product= await product_model.find({});
        res.json({sucess:true, product});
        
    } catch (error) {
        res.json({sucess:false,message:error.message})
        
    }
  
}

export const single_product = async (req, res) => {
    try {
        const{productId}=req.body;
        const product= await product_model.findById(productId);
        res.json({sucess:true,product})
        
    } catch (error) {
        res.json({sucess:false,message:error.message})

        
    }

}

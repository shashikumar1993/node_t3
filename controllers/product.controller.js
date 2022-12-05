const productService  = require('../service/product.service');

const findById = async (req,res) => {
    console.log("Product Controller");
    const product = await productService.getProduct(req.query.productId);
    res.json({status:'success',data:product});
}

const find = async (req,res) => {
    const products = await (await productService.getProductList(req,res))
    res.json({status:'success',data:products})
}

const save = async (req,res) => {
    const product = req.body
    //res.json(product);
    const updateProduct = await productService.createProduct(product);
    res.json({status:'success',data:{product:updateProduct}});
}

const deleteProduct  = async (req,res) => {
    const deleteProduct = await productService.deleteProduct(req.query.id)
}

const uploadImage = async (req,res) => {
    res.json({status:'success',data:req.file.name})
}

// const downloadImage = async (req,res) => {
//     res.sendFile{}
// }

module.exports = { findById, find, save, deleteProduct, uploadImage };
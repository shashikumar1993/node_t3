const productService  = require('../service/product.service');

const findById = async (req,res) => {
    console.log("Product Controller");
    const product = await productService.getProduct(req.query.productId);
    res.json({status:'success',data:product});
}

const find = async (req,res) => {
    const products = await (await productService.getProductList())
    res.json({status:'success',data:products})
}

const save = async (req,res) => {
    const product = req.body
    //res.json(product);
    const updateProduct = await productService.createProduct(product);
    res.json({status:'success',data:{product:updateProduct}});
}

module.exports = { findById, find, save };
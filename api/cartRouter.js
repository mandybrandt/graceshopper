const express = require("express");
const cartRouter = express.Router();
const {
    getCartProductById,
    deleteCartProduct,
    addProductToCart,
    getCart
} = require("../db");
const { requireUser } = require("./utils");
// const { UnauthorizedDeleteError } = require('../errors');

cartRouter.get("/", requireUser, async (req, res) => { //tested working

    const cart = await getCart(req.user.id);
    res.send({ cart });
});

cartRouter.post('/', requireUser, async (req, res, next) => { //tested working
    try
    {const { productId, qty  } = req.body;
    const cartItem = await addProductToCart({cartId:req.user.id, productId, qty})

    res.send(cartItem)
    }catch (error) {
        next(error);
    }
 });   

/*delete item in cart*/
cartRouter.delete("/:cartProductId", requireUser, async (req, res, next) => { 
    console.log('end delete route')
    const { cartProductId } = req.params;
    try {
        const _product = await getCartProductById(cartProductId);
        console.log(_product)

        if (_product.cartId !== req.user.id) {
            res.status(403).send({
                error: 'UserCannotDeleteProduct',
                name: 'User cannot delete product',
                message: UnauthorizedDeleteError(req.user.username, _title.name),
            });
        } else {
            const removeProduct = await deleteCartProduct(_product.id);
            next(removeProduct);
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});


module.exports = cartRouter;
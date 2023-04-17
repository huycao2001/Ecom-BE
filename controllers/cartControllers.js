const c = require("config");
const mongoose = require('mongoose');
const Cart = require("../models/cart.js");
const Item = require("../models/item.js");

module.exports.get_cart_items = async (req, res) => {
    const userId = req.params.id;
    try {
        const cart = await Cart.findOne({ userId });
        if(cart){
            return res.json({
                msg : "Successful", 
                data : cart
            })
        }else{
            return res.json({
                msg : "Successful", 
                data : []
            })
        }
        throw new Error("Cart not found")
    } catch (err) {
        console.log(err);
        return res.json({
            msg : err.message
        })
    }
};

// module.exports.add_cart_item = async (req, res) => {
//     const userId = req.params.id;
//     const { productId, optionId, quantity } = req.body;

//     try {
//         let cart = await Cart.findOne({ userId });
//         let item = await Item.findOne({ _id: productId });
//         if (!item) {
//             res.status(404).send("Item not found!");
//         }
//         let price;
//         let volume;
//         item.Option.every((option) => {
//             if (option.OptionID == optionId) {
//                 price = option.Price;
//                 volume = option.Volume;
//                 return false;
//             }
//             else
//                 return true;
//         });
//         price = Number(price.replace(/[^0-9]+/g, ""));
//         const name = item.Name;
//         const image = item.Image;

//         if (cart) {
//             // if cart exists for the user
//             let itemIndex = cart.items.findIndex(
//                 (p) => p.productId == productId
//             );
            
//             let itemOption = cart.items.findIndex(
//                 (p) => p.optionId == optionId
//             )

//             // Check if product exists or not
//             if (itemIndex > -1) {
//                 // Check if the same item option
//                 if (itemOption > -1){
//                     let productItem = cart.items[itemOption];
//                     productItem.quantity += quantity;
//                     cart.items[itemOption] = productItem;
//                 } 
//                 // Same product but different item option
//                 else { 
//                     cart.items.push({ image, productId, optionId, name, volume, quantity, price });
//                 }
//             } else {
//                 cart.items.push({ image, productId, optionId, name, volume, quantity, price });
//             }
//             cart.bill += quantity * price;
//             cart = await cart.save();
//             return res.status(201).send(cart);
//         } else {
//             // no cart exists, create one
//             const newCart = await Cart.create({
//                 userId : userId,
//                 items: [{ image, productId, optionId, name, volume, quantity, price }],
//                 bill: quantity * price,
//             });
//             return res.status(201).send(newCart);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// };



module.exports.add_cart_item = async (req, res) => {
    const userId = req.params.id;
    const { productId, storageOption, colorOption, quantity } = req.body;
    console.log("begin")

    try {
        let cart = await Cart.findOne({ userId });
        let item = await Item.findOne({ _id: productId });
        let name = item.name;
        
        if (!item) {
            res.status(404).send("Item not found!");
        }
        let price = item.price;
        let volume = 0;
        let image = item.imgUrl;
        if(storageOption){
            // Find the option that has the storage and assign the price
            targetOption = item.storage_options.find(option => option.name === storageOption);
            if(targetOption){
                price = targetOption.price
            }else{
                throw new Error("Storage option not found")
            }


        }
        if(colorOption){
            targetOption = item.color_options.find(option => option.name === colorOption);
            if(targetOption){
                image = targetOption.variantImg
            }else{
                throw new Error("Color option not found")
            }
        }

        if (cart) {
            // if cart exists for the user
            console.log("cart does exist")
            let itemIndex = cart.items.findIndex(
                (cartItem) => {
                    if(colorOption && storageOption){
                        return cartItem.productId == productId && cartItem.colorOption === colorOption && cartItem.storageOption === storageOption
                    }
                    if(colorOption){
                        return cartItem.productId == productId && cartItem.colorOption === colorOption 
                    }

                    if(storageOption){
                        return cartItem.productId == productId && cartItem.storageOption === storageOption       
                    }
                    return cartItem.productId == productId
                } 
            );

            
            // If the product exists
            if (itemIndex > -1) {
                // If same color and storage then increase the number
                let targetItem = cart.items[itemIndex];
                if(colorOption && storageOption){
                    if(targetItem.colorOption === colorOption && targetItem.storageOption === storageOption){
                        cart.items[itemIndex].quantity += quantity
                    }
                }

                else if(colorOption){
                    if(targetItem.colorOption === colorOption){
                        cart.items[itemIndex].quantity += quantity
                    }
                }

                else if(storageOption){
                    if(targetItem.storageOption === storageOption){
                        cart.items[itemIndex].quantity += quantity
                    }              
                }
                else{
                    cart.items[itemIndex].quantity += quantity

                }
                
            } else {
                cart.items.push({ image, productId, name,colorOption, storageOption, quantity, price });
            }
            cart.bill += quantity * price;
            cart = await cart.save();
            return res.json({
                msg : "Successful", 
                data : cart
            });
        } else {
            // no cart exists, create one
            console.log("no cart exist")
            const newCart = await Cart.create({
                userId : userId,
                items: [{ image, productId, name,colorOption, storageOption,  quantity, price }],
                bill: quantity * price,
            });
            return res.json({
                msg : "Successful", 
                cart : newCart
            });
        }
    } catch (err) {
        console.log(err.message);
        // res.status(500).send("Something went wrong");
        res.json({
            msg : err.message
        })
    }
};

module.exports.update_cart_item = async (req, res) => {
    const userId = req.params.id;
    const { cartItemId, quantity } = req.body;
    try {   
        if(quantity < 1){
            throw new Error("Quantity must be larger than 0")
        }

        let cart = await Cart.findOne({ userId });
        if(!cart){
            throw new Error("Cart not found")
        }
        else {
            // if cart exists for the user
            let targetCartItem = cart.items.find(item => {
                console.log(item._id.toString() + " - " + cartItemId); 
                console.log(typeof item._id + " - " + typeof cartItemId); 

                return item._id.toString() === cartItemId
            });

            if(!targetCartItem){
                throw new Error("Cart item not found");
            }
            
            targetCartItem.quantity = quantity;

            cart.bill = cart.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            cart = await cart.save();
            return res.json({
                msg : "Successful",
                data : cart
            })
        }
    } catch (err) {
        // just printing the error wont help us find where is the error. Add some understandable string to it.
        console.log("Error in update cart", err);
        res.json({
            msg : err.message
        })
    }
};

module.exports.delete_item = async (req, res) => {
    const userId = req.params.userId;
    const { cartItemId } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction(); 
    try {
      // Start transaction

  
      let cart = await Cart.findOne({ userId }).session(session);
      if (!cart) {
        throw new Error('The user does not have any cart');
      }
  
      let itemIndex = cart.items.findIndex((p) => p._id == cartItemId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        cart.bill -= productItem.quantity * productItem.price;
        cart.items.splice(itemIndex, 1);
      } else {
        throw new Error('No item found to delete');
      }
      if(cart.items.length === 0){
        // Delete this cart
        cart.remove();
      }
      else{
        cart = await cart.save({ session });
      }
      


  
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
  
      return res.json({
        msg: 'Successful',
        // deletedItem : productItem
      });
    } catch (err) {
      // Rollback the transaction if an error occurred
      console.log(err);
      await session.abortTransaction();
      session.endSession();
      res.json({
        msg: err.message,
      });
    }
  };



  module.exports.delete_cart = async (req, res) => {
    const userId = req.params.userId;
    const session = await mongoose.startSession();
    session.startTransaction(); 
    try {
      // Start transaction

  
      let cart = await Cart.findOne({ userId }).session(session);
      if (!cart) {
        throw new Error('The user does not have any cart');
      }

  
      await cart.remove();
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
  
      return res.json({
        msg: 'Successful',
        // deletedItem : productItem
      });
    } catch (err) {
      // Rollback the transaction if an error occurred
      console.log(err);
      await session.abortTransaction();
      session.endSession();
      res.json({
        msg: err.message,
      });
    }
  };

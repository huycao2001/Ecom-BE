const Item = require("../models/item.js");

module.exports.get_items = async (req, res) => {
    const session = await Item.startSession();
    const {
        category,
        minPrice, 
        maxPrice,
        searchKey
    } = req.query

  
    try {
      await session.withTransaction(async () => {
        var queries = []
        if(category){
            queries.push({
                category : category
            })
        }

        if(minPrice && maxPrice){

            queries.push({
                price: { $lte: maxPrice || 100000000, $gte: minPrice || 0 }
            })
        }

        if(searchKey){
            queries.push({ name: {
                $regex: searchKey, $options: 'i' 
            } })
        }
        
        var items
        if(queries.length){
            items = await Item.find({ $and : queries}).sort({ date: -1 }).session(session);
        }else{
            // Get some products from each categories
            //items = await Item.find().sort({ date: -1 }).session(session);
            applePhones = await Item.find({category : "Apple"}).limit(4);
            samsungPhones = await Item.find({category : "Samsung"}).limit(4); 
            nokiaPhones = await Item.find({category : "Nokia"}).limit(4); 
            xiaomiPhones = await Item.find({category : "Xiaomi"}).limit(4);
            oppoPhones = await Item.find({category : "Oppo"}).limit(4);
            items = [
                ...applePhones,
                ...samsungPhones,
                ...nokiaPhones,
                ...xiaomiPhones,
                ...oppoPhones
            ]

        }
        
        res.json({
          message: "Successful",
          data: items,
        //   category : category
        });
      });
    } catch (error) {
      console.log(error);
      return res.json({ message: error.message});
    } finally {
      session.endSession();
    }
  };
  
module.exports.get_item_by_id = (req, res) => {
    var ObjectId = require('mongoose').Types.ObjectId; 
    // const { 
    //     item_id 
    // } = req.body;

    const item_id = req.params.id
    try{
        Item.findOne({ _id : new ObjectId(item_id)}).then((item) => {
            if(item){ 
                res.json({
                    msg : "Successful", 
                    data : item
                })
            }else{
                res.json({
                    msg : "No item found"
                })
            }
    
    
        });
    }catch(e){
        res.json({
            msg : e.message
        })
    }
};

module.exports.post_item = (req, res) => {
    // res.json(req.body)
    const {
        name, 
        price, 
        badges, 
        imgUrl, 
        category, 
        descriptions, 
        storage_options, 
        color_options,
        promotion_options, 
        status_options 
    } = req.body;


    const newItem = new Item({name, price, badges, imgUrl, category, descriptions, storage_options, color_options,promotion_options, status_options});
    newItem.save().then((item) => res.json(item));
};

module.exports.update_item = (req, res) => {
    Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
        item
    ) {
        Item.findOne({ _id: req.params.id }).then(function (item) {
            res.json(item);
        });
    });
};

module.exports.delete_item = (req, res) => {
    Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
        res.json({ success: true });
    });
};

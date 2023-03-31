const Item = require("../models/item.js");

module.exports.get_items = async (req, res) => {
    const session = await Item.startSession();
  
    try {
      await session.withTransaction(async () => {
        const items = await Item.find().sort({ date: -1 }).session(session);

        // const {category} = req.query
        res.json({
          message: "Success",
          items: items,
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
    const { item_id } = req.body;
    Item.find({ ID: `${item_id}` }).then((item) => res.json(item));
};

module.exports.post_item = (req, res) => {
    // res.json(req.body)
    const {name, price, badges, imgUrl, category, descriptions, storage_options, color_options,promotion_options, status_options } = req.body;


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

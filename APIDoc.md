# EcomBE APIs document
# Base Url
https://ecom-be.vercel.app
# Authentication 
## Login

```yaml
path : /login

method : POST
body : {
    "email" : "bahuycao2001@gmail.com",
    "password" : "14112001"

}

response : {
    "msg": "Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjY4ZWI3ZTgyNTZhNjVhODAzNDRhMCIsImlhdCI6MTY4MDYxMDg4MCwiZXhwIjoxNjgwNjE0NDgwfQ.b-A7lYYZDqYb5wAcJseptQdo8fzpKU8jgrR5XdlbBko",
    "user": {
        "id": "64268eb7e8256a65a80344a0",
        "name": "huycao",
        "email": "bahuycao2001@gmail.com"
    }
}

# Note : Lưu cái user.id vào local storage để sử dụng sau, hiện tại chưa cần chèn JWT token vào header


```


## Register account

```yaml
path : /register

method : POST
body : {
    "name" : "huycao",
    "email" : "bahuycao1411@gmail.com",
    "password" : "14112001",
    "gender" : "male",
    "bday" : "Wed Nov 14 2001 12:34:56 GMT+0000 (Coordinated Universal Time)"

}

response : {
    "msg": "New account has been successfully created.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmMxNzE2ZWYwZjdiNDEyOGMxMWM2MSIsImlhdCI6MTY4MDYxMTA5NCwiZXhwIjoxNjgwNjE0Njk0fQ.EUwJLoQJ6O1EOUwLKE73dy1EJ8cnP_EPQNTcbTYPl1E",
    "user": {
        "id": "642c1716ef0f7b4128c11c61",
        "name": "huycao",
        "email": "bahuycao1411@gmail.com"
    }
}




```

# Products
## Get products with filter

```yaml
path : /items

method : GET


query params : 
    category : Get items based on category
    minPrice : Get items based on minimum price of products
    maxPrice : Get items based on maximum price of products

response : {
    "message": "Successful",
    "data": [
        {
            "badges": [
                "6.1 inches",
                "4 GB",
                "64 GB"
            ],
            "descriptions": [
                "Màu sắc phù hợp cá tính - 6 màu sắc bắt mắt để lựa chọn",
                "Hiệu năng mượt mà, ổn định - Chip A13, RAM 4GB",
                "Bắt trọn khung hình - Camera kép hỗ trợ góc rộng, chế độ Night Mode",
                "Yên tâm sử dụng - Kháng nước, kháng bụi IP68, kính cường lực Gorilla"
            ],
            "storage_options": [
                {
                    "name": "512GB",
                    "price": 25500000
                },
                {
                    "name": "256GB",
                    "price": 19990000
                },
                {
                    "name": "128GB",
                    "price": 16990000
                }
            ],
            "color_options": [
                {
                    "name": "Trắng",
                    "price": 10850000,
                    "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/i/p/iphone11-white-select-2019_3.png"
                },
                {
                    "name": "Đen",
                    "price": 10590000,
                    "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/1/1/11._d_nn.jpg"
                }
            ],
            "promotion_options": [
                "[HOT] Thu cũ lên đời giá cao - Thủ tục nhanh - Trợ giá lên tới 1.000.000đ (Xem chi tiết)"
            ],
            "status_options": [
                "Mới, đầy đủ phụ kiện từ nhà sản xuất",
                "Thân máy, cáp USB-C to Lightning, sách HDSD",
                "1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple : Điện Thoại Vui ASP (Apple Authorized Service Provider)(xem chi tiết)"
            ],
            "_id": "6429d69287cb358e29465614",
            "id": 4,
            "name": "iPhone 11 64GB I Chính hãng VN/A",
            "imgUrl": "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/3/_/3_225.jpg",
            "price": 10590000,
            "category": "Apple",
            "url": "https://cellphones.com.vn/iphone-11.html"
        }
    ]
}


```



## Get product based on product id (_id) : 1 product only

```yaml
path : /item/<:product_id>

method : GET

response : {
    "msg": "Successful",
    "data": {
        "badges": [
            "6.1 inches",
            "4 GB",
            "128 GB"
        ],
        "descriptions": [
            "Hiệu năng vượt trội - Chip Apple A15 Bionic mạnh mẽ, hỗ trợ mạng 5G tốc độ cao",
            "Không gian hiển thị sống động - Màn hình 6.1\" Super Retina XDR độ sáng cao, sắc nét",
            "Trải nghiệm điện ảnh đỉnh cao - Camera kép 12MP, hỗ trợ ổn định hình ảnh quang học",
            "Tối ưu điện năng - Sạc nhanh 20 W, đầy 50% pin trong khoảng 30 phút"
        ],
        "storage_options": [
            {
                "name": "512GB",
                "price": 25500000
            },
            {
                "name": "256GB",
                "price": 19990000
            },
            {
                "name": "128GB",
                "price": 16990000
            }
        ],
        "color_options": [
            {
                "name": "Xanh lá",
                "price": 17390000,
                "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png"
            },
            {
                "name": "Trắng",
                "price": 17390000,
                "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/t/r/tr_ng_5.jpg"
            },
            {
                "name": "Đỏ",
                "price": 16990000,
                "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/f/i/file_3_10.jpg"
            },
            {
                "name": "Đen",
                "price": 17390000,
                "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/_/e/_en_2_5.jpg"
            },
            {
                "name": "Hồng",
                "price": 17390000,
                "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/h/_/h_ng_4.jpg"
            },
            {
                "name": "Xanh dương",
                "price": 17390000,
                "variantImg": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/d/_/d_ng_3.jpg"
            }
        ],
        "promotion_options": [
            "Thu cũ lên đời - Trợ giá 1 triệu (Xem chi tiết)"
        ],
        "status_options": [
            "Máy mới 100% , chính hãng Apple Việt Nam.\nCellphoneS hiện là đại lý bán lẻ uỷ quyền iPhone chính hãng VN/A của Apple Việt Nam",
            "iPhone 13 128GB, cáp USB-C sang Lightning",
            "1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple : Điện Thoại Vui ASP (Apple Authorized Service Provider)(xem chi tiết)"
        ],
        "_id": "6429d69287cb358e29465612",
        "id": 2,
        "name": "iPhone 13 128GB | Chính hãng VN/A",
        "imgUrl": "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
        "price": 16990000,
        "category": "Apple",
        "url": "https://cellphones.com.vn/iphone-13.html"
    }
}


```

# Cart 
## Get cart items



```yaml
path : /cart/<:user_id>

method : GET

response : {
    "msg": "Successful",
    "data": {
        "bill": 199900000,
        "_id": "642c10a4c9fbbe00088f0132",
        "userId": "64268eb7e8256a65a80344a0",
        "items": [
            {
                "quantity": 10,
                "_id": "642c10a4c9fbbe00088f0133",
                "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
                "productId": "6429d69287cb358e29465612",
                "name": "iPhone 13 128GB | Chính hãng VN/A",
                "colorOption": "Xanh lá",
                "storageOption": "256GB",
                "price": 19990000
            }
        ],
        "__v": 0
    }
}

```

## Add an item to cart



```yaml
path : /cart/<:user_id>

method : POST


body : {
{
    "productId" : "6429d69287cb358e29465612",
    "storageOption" : "256GB",
    "colorOption" : "Xanh lá",
    "quantity": 10  
}
}

response : {
    "msg": "Successful",
    "data": {
        "bill": 799600000,
        "_id": "642c10a4c9fbbe00088f0132",
        "userId": "64268eb7e8256a65a80344a0",
        "items": [
            {
                "quantity": 40,
                "_id": "642c10a4c9fbbe00088f0133",
                "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
                "productId": "6429d69287cb358e29465612",
                "name": "iPhone 13 128GB | Chính hãng VN/A",
                "colorOption": "Xanh lá",
                "storageOption": "256GB",
                "price": 19990000
            }
        ],
        "__v": 0
    }
}

```




## Update quantity of cart item 



```yaml
path : /cart/<:user_id>

method : PUT


body : {
    "cartItemId" : "642c10a4c9fbbe00088f0133" (_id of the item),
    "quantity" : 2
}

response : {
    "msg": "Successful",
    "data": {
        "bill": 39980000,
        "_id": "642c10a4c9fbbe00088f0132",
        "userId": "64268eb7e8256a65a80344a0",
        "items": [
            {
                "quantity": 2,
                "_id": "642c10a4c9fbbe00088f0133",
                "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
                "productId": "6429d69287cb358e29465612",
                "name": "iPhone 13 128GB | Chính hãng VN/A",
                "colorOption": "Xanh lá",
                "storageOption": "256GB",
                "price": 19990000
            }
        ],
        "__v": 0
    }
}

```




## Delete a cart item 



```yaml
path : /cart/<:user_id>

method : DELETE


body : {
    "cartItemId" : "642c10a4c9fbbe00088f0133" (_id of the item)
}

response : {
    "msg": "Successful",
    
}

```


## Delete the whole cart of the user



```yaml
path : /cart/<:user_id>/delete_cart

method : DELETE


response : {
    "msg": "Successful",
    
}

```


# Order
## Create an order for user



```yaml
path : /order

method : POST

body : {
    "userId" : "64268eb7e8256a65a80344a0",
    "items": [
        {
        "quantity": 10,
        "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
        "productId": "6429d69287cb358e29465612",
        "name": "iPhone 13 128GB | Chính hãng VN/A",
        "colorOption": "Xanh lá",
        "storageOption": "256GB",
        "price": 19990000
        }
    ],
    "shippingInfo" : {
        "name" : "cao ba huy", 
        "address" : "200 tbt", 
        "contact" : "0769631631"
    }, 
    "bill" : "10000000",
    "status" : "open"
}

response:
{
    "msg": "Successful",
    "data": {
        "_id": "642c138e2a268821806a5953",
        "userId": "64268eb7e8256a65a80344a0",
        "items": [
            {
                "quantity": 10,
                "_id": "642c138e2a268821806a5954",
                "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
                "productId": "6429d69287cb358e29465612",
                "name": "iPhone 13 128GB | Chính hãng VN/A",
                "colorOption": "Xanh lá",
                "storageOption": "256GB",
                "price": 19990000
            }
        ],
        "shippingInfo": {
            "name": "cao ba huy",
            "address": "200 tbt",
            "contact": "0769631631"
        },
        "bill": 10000000,
        "status": "open",
        "dateAdded": "2023-04-04T12:09:50.255Z",
        "__v": 0
    }
}

```



## Get user's orders




```yaml
path : /order/<:user_id>

method : GET

body : {
    "userId" : "64268eb7e8256a65a80344a0",
    "items": [
        {
        "quantity": 10,
        "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
        "productId": "6429d69287cb358e29465612",
        "name": "iPhone 13 128GB | Chính hãng VN/A",
        "colorOption": "Xanh lá",
        "storageOption": "256GB",
        "price": 19990000
        }
    ],
    "shippingInfo" : {
        "name" : "cao ba huy", 
        "address" : "200 tbt", 
        "contact" : "0769631631"
    }, 
    "bill" : "10000000",
    "status" : "open"
}

response:
{
    "msg": "Successful",
    "data": [
        {
            "shippingInfo": {
                "name": "cao ba huy",
                "address": "ddjdjdjjd",
                "contact": "0769631631"
            },
            "_id": "642c0f8d8f44061eccb26ea8",
            "userId": "64268eb7e8256a65a80344a0",
            "items": [
                {
                    "quantity": 20,
                    "_id": "642c0f8d8f44061eccb26ea9",
                    "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
                    "productId": "6429d69287cb358e29465612",
                    "name": "iPhone 13 128GB | Chính hãng VN/A",
                    "colorOption": "Xanh lá",
                    "storageOption": "256GB",
                    "price": 19990000
                }
            ],
            "bill": 10000000,
            "status": "open",
            "dateAdded": "2023-04-04T11:52:45.201Z",
            "__v": 0
        },
        {
            "shippingInfo": {
                "name": "cao ba huy",
                "address": "200 tbt",
                "contact": "0769631631"
            },
            "_id": "642c138e2a268821806a5953",
            "userId": "64268eb7e8256a65a80344a0",
            "items": [
                {
                    "quantity": 10,
                    "_id": "642c138e2a268821806a5954",
                    "image": "https://cdn2.cellphones.com.vn/50x50,webp,q100/media/catalog/product/x/n/xnnah_kas_3.png",
                    "productId": "6429d69287cb358e29465612",
                    "name": "iPhone 13 128GB | Chính hãng VN/A",
                    "colorOption": "Xanh lá",
                    "storageOption": "256GB",
                    "price": 19990000
                }
            ],
            "bill": 10000000,
            "status": "open",
            "dateAdded": "2023-04-04T12:09:50.255Z",
            "__v": 0
        }
    ]
}

```





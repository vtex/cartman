function readOrderForm(orderForm){
  let orderFormList = []
  if (orderForm && orderForm.items) {
    orderForm.items.map((item) => {
      orderFormList =
      [
        ...orderFormList,
        {
          skuId : item.id,
          quantity: item.quantity,
          seller: item.seller,
        }
      ]
    })
  }
  return orderFormList
}

export function generateUrl(orderForm, account){
  const orderFormList = readOrderForm(orderForm)
  if (orderFormList.length === 0 ) return `https://${account}.vtexcommercestable.com.br/checkout/`

  let queryString = `?sku=${orderFormList[0].skuId}&qty=${orderFormList[0].quantity}&seller=${orderFormList[0].seller}&sc=${orderForm.salesChannel}`
  orderFormList.map((element, index) => {
    if (index > 0){
      queryString = queryString + `&sku=${orderFormList[index].skuId}&qty=${orderFormList[index].quantity}&seller=${orderFormList[index].seller}&sc=${orderForm.salesChannel}`
    }
  })
  return  `https://${account}.vtexcommercestable.com.br/checkout/cart/add/${queryString}`
}

export function buildQueryString(jsonObject) {
    var query = "/api/catalog_system/pub/products/search/";

    if (jsonObject === null) {
        return query;
    }
    else {
        var productName = "";
        var priceFrom = 0;
        var priceTo = 99999;
        var filters = "?fq=";
        var param = ""
        for (param in jsonObject) {
            switch (param) {
                case "numberOfItems":
                    break;
                case "priceFrom":
                    priceFrom = jsonObject["priceFrom"];
                    break;
                case "priceUp":
                    priceTo = jsonObject["priceUp"];
                    break;
                case "categories":
                    filters = filters + "C:/" + jsonObject["categories"]+"/,";
                    break;
                case "brand":
                    filters = filters + "brandId:" + jsonObject["brands"] + ",";
                    break;
                case "collections":
                    filters = filters + "productClusterIds:" + jsonObject["collections"] + ",";
                    break;
                case "itemsSellers":
                    filters = filters + "sellerId:" + jsonObject["itemsSellers"] + ",";
                    break;
                default:
            }

            return query + filters + `P:[${priceFrom} TO ${priceTo}]&_from=0&_to=49`;
        }
    }
}

<<<<<<< HEAD
export function selectFromPossibleItems(possibleItems, number, seller, quantity){
=======
export function selectFromPossibleItems(possibleItems, number, seller){
>>>>>>> Fix add items to cart feature

	var selectedItems = [];

	var drawList = possibleItems.reduce(selectMany(x=>x.items), []);

	for (var i = 0; i < number; i++) {
		var index = Math.floor(Math.random()*drawList.length);
<<<<<<< HEAD
		selectedItems.push({id: parseInt(drawList[index].itemId), quantity: quantity, seller: seller});
=======
		selectedItems.push({id: parseInt(drawList[index].itemId), quantity: 1, seller: seller});
>>>>>>> Fix add items to cart feature
    }
	return selectedItems

}

function selectMany(f){
   return function (acc,b) {
       return acc.concat(f(b))
   }
}

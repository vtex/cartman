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
  if (orderFormList.length === 0 ) return `${window.location.origin}/checkout/`

  let queryString = `?sku=${orderFormList[0].skuId}&qty=${orderFormList[0].quantity}&seller=${orderFormList[0].seller}&sc=${orderForm.salesChannel}`
  orderFormList.map((element, index) => {
    if (index > 0){
      queryString = queryString + `&sku=${orderFormList[index].skuId}&qty=${orderFormList[index].quantity}&seller=${orderFormList[index].seller}&sc=${orderForm.salesChannel}`
    }
  })
  return  `${window.location.origin}/checkout/cart/add/${queryString}`
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

        if(jsonObject.hasOwnProperty("priceFrom")){
          priceFrom = jsonObject["priceFrom"];
        }
        if (jsonObject.hasOwnProperty("priceUp")){
          priceTo = jsonObject["priceUp"];
        }
        if(jsonObject.hasOwnProperty("categories")){
          filters = filters + "C:/" + jsonObject["categories"]+"/,";
        }
        if(jsonObject.hasOwnProperty("brand")){
          filters = filters + "brandId:" + jsonObject["brands"] + ",";
        }
        if(jsonObject.hasOwnProperty("collections")){
          filters = filters + "productClusterIds:" + jsonObject["collections"] + ",";
        }
        if(jsonObject.hasOwnProperty("itemsSellers")){
          filters = filters + "sellerId:" + jsonObject["itemsSellers"] + ",";
        }
        return query + filters + `P:[${priceFrom} TO ${priceTo}]&_from=0&_to=49`;
    }
}

export function selectFromPossibleItems(possibleItems, number = 1, seller, quantity){

	var selectedItems = [];
	var drawList = possibleItems.reduce(selectMany(x=>x.items), []);

	for (var i = 0; i < number; i++) {
		var index = Math.floor(Math.random() * drawList.length);
		selectedItems.push({id: parseInt(drawList[index].itemId), quantity: quantity, seller: seller});
    }
	return selectedItems
}

function selectMany(f){
   return function (acc,b) {
       return acc.concat(f(b))
   }
}


export function getAccountName() {
  return window.vtex && window.vtex.accountName
}
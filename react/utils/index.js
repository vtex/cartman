function readOrderForm(orderForm){
  let orderFormList = []
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

function buildQueryString(environment, jsonObject) {

    var query = environment + ".vtexcommercestable.com.br/api/catalog_system/pub/products/search/"

    if (jsonObject === null) {
        return query;
    }
    else {
        var productName = "";
        var priceFrom = 0;
        var priceTo = 99999;
        var filters = "?fq=";

        for (param in jsonObject) {
            switch (param) {
                case "number":
                    break;
                case "priceFrom":
                    priceFrom = jsonObject["priceFrom"];
                    break;
                case "priceTo":
                    priceTo = jsonObject["priceTo"];
                    break;
                case "category":
                    filters = filters + "C:/" + jsonObject["category"]+"/,";
                    break;
                case "brand":
                    filters = filters + "brandId:" + jsonObject["brandId"] + ",";
                    break;
                case "collection":
                    filters = filters + "productClusterIds:" + jsonObject["collection"] + ",";
                    break;
                case "seller":
                    filters = filters + "sellerId:" + jsonObject["seller"] + ",";
                    break;
                case "skuId":
                    filters = filters + "skuId:" + jsonObject["skuId"] + ",";
                    break;
                default:
            }

            return query + filters + "P:[" + priceFrom + " TO " + priceTo + "]";
        }
    }
}
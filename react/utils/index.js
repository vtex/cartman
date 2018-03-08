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
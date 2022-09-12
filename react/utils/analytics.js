import { v4 } from "uuid"

const ANALYTICS_ENDPOINT = 'https://rc.vtex.com/api/analytics/schemaless-events'
const METRIC_NAME = 'promotions-simulator'

function getPromotionsSimulatorSessionId() {
  const sessionId = window.sessionStorage.getItem('vtex-promotions-simulator-session-id')

  if (!sessionId) {
    const uuid = v4()
    window.sessionStorage.setItem('vtex-promotions-simulator-session-id', uuid)

    return uuid
  }

  return sessionId
}

function eventDefaultData() {
  const orderForm = window.vtexjs.checkout.orderForm
  const renderRuntime = window.vtex.renderRuntime
  const sessionId = getPromotionsSimulatorSessionId()

  return {
    name: METRIC_NAME,
    meta: {
      account: renderRuntime.account,
      workspace: renderRuntime.workspace,
      sessionId,
      orderFormId: orderForm.orderFormId,
      locale: renderRuntime.culture.locale
    }
  }
}

export function logEvent(eventName, eventData = {}) {
  const defaultData = eventDefaultData()

  const body = {
    ...defaultData,
    timestamp: new Date().toJSON(),
    eventName,
    data: eventData ?? {},
  }

  fetch(ANALYTICS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

import Amplitude from 'amplitude-js';
import { getAccountName } from '../utils';

// TODO @vlaux replace by production API Key
const AMPLITUDE_API_KEY = '7bbbcda7896c3419df94498c0928d463'

export function init() {
  console.log("abri")
  Amplitude.getInstance().init(AMPLITUDE_API_KEY)
  Amplitude.getInstance().setGroup('VTEX Account', getAccountName());
}

export function logEvent(eventName, eventProperties = {}) {
  Amplitude.getInstance().logEvent(eventName, eventProperties)
}
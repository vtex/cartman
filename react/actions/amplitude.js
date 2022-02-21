import Amplitude from 'amplitude-js';
import { getAccountName } from '../utils';

const AMPLITUDE_API_KEY = '051cbcefafb8d388b8592ca1e2920623'

export function init() {
  Amplitude.getInstance().init(AMPLITUDE_API_KEY)
  Amplitude.getInstance().setGroup('VTEX Account', getAccountName());
}

export function logEvent(eventName, eventProperties = {}) {
  Amplitude.getInstance().logEvent(eventName, eventProperties)
}
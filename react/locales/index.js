import { addLocaleData } from 'react-intl'
import ptLocaleData from 'react-intl/locale-data/pt'
import esLocaleData from 'react-intl/locale-data/es'

import enCartman from './en-US.json'
import ptCartman from './pt-BR.json'
import esCartman from './es.json'

addLocaleData(ptLocaleData)
addLocaleData(esLocaleData)

const pt = {
  ...ptCartman,
}

const ptBR = {
  ...pt,
}

const en = {
  ...enCartman,
}

const es = {
  ...esCartman,
}

export default {
  'pt-BR': ptBR,
  pt,
  'en-US': en,
  en,
  es,
}

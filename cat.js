import { createSyncCategories } from '@commercetools/sync-actions'
import { createClient } from '@commercetools/sdk-client'

const syncInventories = createSyncCategories()
// const client = createClient({
//   middlewares: [createHttpMiddleware()],
// })
const before = {
    name: { en: 'Foods' }
  }
  const now = {
    name: { en: 'Foods', de: 'Lebensmittel' }
  }
const actions = syncInventories.buildActions(now, before)
console.info('actions...',actions);
console.info('before.id...',before.id);
console.info('before.version...',before.version);
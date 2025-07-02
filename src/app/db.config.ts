import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

export const dbConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'gifImages',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'base64', keypath: 'base64', options: { unique: false } }
    ]
  }]
}; 
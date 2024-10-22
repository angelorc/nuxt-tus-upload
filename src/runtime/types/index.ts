import type { DataStore, ServerOptions, WithOptional } from '@tus/server'

export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
export type TusEventHandlerOptions = WithOptional<ServerOptions, 'locker'> & {
  datastore: DataStore
} & {
  allowedMethods?: Methods[]
}

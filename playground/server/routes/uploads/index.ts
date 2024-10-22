import { FileStore } from '@tus/file-store'
import type { TusEventHandlerOptions } from '#nuxt-tus-upload'

export const tusConfig = <TusEventHandlerOptions>{
  path: '/uploads',
  datastore: new FileStore({ directory: '.tmp' }),
  respectForwardedHeaders: true,
  allowedHeaders: ['Authorization', 'X-Upsert', 'Upload-Expires', 'ApiKey', 'x-signature'],
  maxSize: 100 * 1024 * 1024, // 100MB
  onUploadCreate: async (req, res, upload) => {
    console.log('Upload created', upload.id)
    return res
  },
  onUploadFinish: async (req, res, upload) => {
    console.log('Upload finished', upload.id)
    return res
  },
  onResponseError: async (req, res, error) => {
    console.error('Error', error)
    throw error
  },
}

export default defineTusEventHandler(tusConfig)

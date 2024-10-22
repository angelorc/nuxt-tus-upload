import { Server } from '@tus/server'
import { createError, eventHandler, type H3Event } from 'h3'
import type { TusEventHandlerOptions, Methods } from '#nuxt-tus-upload'

export const xProtoKey = 'x-forwarded-proto'
export const isXProtoHeaderValid = (value: string) => /^https?/i.test(value)

export function defineTusEventHandler(options: TusEventHandlerOptions) {
  const tus = new Server(options)

  return eventHandler(async (event: H3Event) => {
    const { req, res } = event.node

    if (options.allowedMethods && !options.allowedMethods.includes(req.method as Methods)) {
      throw createError({ statusCode: 405, message: 'Method Not Allowed' })
    }

    // Remove once this issue is resolved:
    // Thanks to https://github.com/twi-dev/twi/blob/7dd744c4af972d2475296a5c51221bbd0bd7620e/server/lib/uploads/handler.ts#L10
    const { headers } = req
    const xProto = headers[xProtoKey]
    if (xProto && !isXProtoHeaderValid(String(xProto))) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete req.headers[xProtoKey]
    }

    return tus.handle(req, res)
  })
}

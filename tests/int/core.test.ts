import config from '@payload-config'
import { getPayload } from 'payload'
import { afterAll, describe, expect, it } from 'vitest'

let payload: Awaited<ReturnType<typeof getPayload>> | undefined

export async function getTestPayload() {
  payload ??= await getPayload({ config })
  return payload
}

afterAll(async () => {
  await payload?.destroy()
})

describe('payload boot', () => {
  it('opens the database and reads users', async () => {
    const instance = await getTestPayload()
    const result = await instance.find({
      collection: 'users',
      overrideAccess: false,
    })
    expect(result.totalDocs).toBe(0)
  })
})

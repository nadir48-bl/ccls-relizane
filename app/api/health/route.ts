import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    await payload.count({ collection: 'users', overrideAccess: true })
    return Response.json({ ok: true, db: 'up' })
  } catch {
    return Response.json({ ok: false, db: 'down' }, { status: 503 })
  }
}

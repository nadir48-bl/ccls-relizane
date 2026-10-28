import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { ar } from '@payloadcms/translations/languages/ar'
import { buildConfig } from 'payload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { Users } from './collections/Users'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const databaseURI = process.env.DATABASE_URI || 'file:./.data/ccls.db'
const isSQLite = databaseURI.startsWith('file:')

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: '— تعاونية الحبوب والبقول الجافة غليزان' },
  },
  collections: [Users],
  db: isSQLite
    ? sqliteAdapter({ client: { url: databaseURI }, wal: true })
    : postgresAdapter({ pool: { connectionString: databaseURI } }),
  editor: lexicalEditor(),
  i18n: { supportedLanguages: { ar }, fallbackLanguage: 'ar' },
  secret: process.env.PAYLOAD_SECRET || 'dev-only-secret',
  sharp,
  telemetry: false,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})

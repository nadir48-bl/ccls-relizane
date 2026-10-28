import { mkdirSync, rmSync } from 'node:fs'

export default function setup() {
  mkdirSync('.data', { recursive: true })
  rmSync('.data/test.db', { force: true })
  rmSync('.data/test.db-wal', { force: true })
  rmSync('.data/test.db-shm', { force: true })
}

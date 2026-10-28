import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  turbopack: {
    root: process.cwd(),
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default withPayload(nextConfig)

import React from 'react'
import Head from 'next/head'

export type SEOProps = {
  title: string
  meta: {
    description?: string
  }
}

export const SEO: React.FC<SEOProps> = ({ title, meta }) => (
  <Head>
    <title>{title}</title>
    <meta
      name="description"
      content={meta.description || 'Description'}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

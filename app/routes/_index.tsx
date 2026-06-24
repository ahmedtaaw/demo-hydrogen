import type { Route } from './+types/_index'
import { useLoaderData } from 'react-router'
import { BundleBuilderPage } from '@/pages/BundleBuilderPage'
import { mapCatalog } from '@/data/catalog.mapper'
import { CatalogProvider } from '@/data/catalog.context'

const CATALOG_QUERY = `#graphql
  query BundleCatalog {
    products(first: 50) {
      nodes {
        id
        title
        description
        tags
        featuredImage { url altText }
        variants(first: 50) {
          nodes {
            id
            title
            availableForSale
            selectedOptions { name value }
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
          }
        }
      }
    }
  }
`

export async function loader({ context }: Route.LoaderArgs) {
  const { products } = await context.storefront.query(CATALOG_QUERY)
  return { catalog: mapCatalog(products.nodes) }
}

export default function Index() {
    const { catalog } = useLoaderData<typeof loader>()
  console.log('MAPPED CATALOG →', JSON.stringify(catalog, null, 2))
 return (
    <CatalogProvider data={catalog}>
      <BundleBuilderPage />
    </CatalogProvider>
  )
}
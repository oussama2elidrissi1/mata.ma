import ClientPage from './ClientPage'

type PageProps = {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]
}

export default function NewsPage({ params }: PageProps) {
  return <ClientPage />
}

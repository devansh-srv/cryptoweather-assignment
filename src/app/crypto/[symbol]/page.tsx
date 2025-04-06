import CryptoDetailClient from './CryptoDetailClient';

export default async function CryptoDetail({ params }: { params: Promise<{ symbol: string }> }) {
  const awaitedParams = await params;
  const { symbol } = awaitedParams;
  const res = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${encodeURIComponent(symbol)}&tsyms=USD`, {
  });
  if (!res.ok) {
    throw new Error('Failed to fetch initial crypto data');
  }
  const initialData = await res.json();
  return (
    <>
      <CryptoDetailClient params={params} initialData={initialData} />
    </>
  );
}

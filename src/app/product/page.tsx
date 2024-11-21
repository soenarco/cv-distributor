'use client';
import { useEffect, useState } from 'react';
import CardImage from '@/app/component/cardImage';
import { apiGetAllProduct } from '@/app/utils/apiAction';
import LoadingScreen from '@/app/component/loadingScreen'

export type Product = {
  id: number;
  name: string;
  description?: string;
  package: 'SATUAN' | 'DUS' | 'KRAT';
  totalInPackage?: number;
  image?: string;
  size?: string;
  harga: number;
  isReadyStock: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiGetAllProduct();
        setProducts(data);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingScreen isVisible={loading}/>
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Produk</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative rounded-xl bg-red-50 border p-4">
              <CardImage source={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">Size: {product.size}</p>
                <p className="text-sm text-gray-500">Rp {product.harga.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

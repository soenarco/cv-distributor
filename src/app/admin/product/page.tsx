'use client';
import { useEffect, useState } from 'react';
import { MdAddBox } from "react-icons/md";
import { apiGetAllProduct } from '@/app/utils/apiAction';
import LoadingScreen from '@/app/component/loadingScreen';
import TableList from '@/app/component/tableList';

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

export default function AdminProductPage() {
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
    return <LoadingScreen isVisible={loading} />
  }

  const columnOfTable = [
    { type: 'string', key: 'name', label: 'Nama Produk' },
    { type: 'string', key: 'description', label: 'Deskripsi' },
    { type: 'string', key: 'size', label: 'Ukuran per Kemasan' },
    { type: 'string', key: 'totalInPackage', label: 'Jumlah per Kemasan' },
    { type: 'string', key: 'package', label: 'Kemasan' },
    { type: 'currency', key: 'harga', label: 'Harga' },
    { type: 'boolean', key: 'isReadyStock', label: 'Ready Stock' },
    // { type: 'string', key: 'createdAt', label: 'Created At' },
    // { type: 'string', key: 'updatedAt', label: 'Updated At' },
  ] as { type: string, key: keyof Product; label: string }[];

  return (
    <div className="bg-white py-5">
      <div className="grid grid-cols-12 gap-4">
        <div className="p-4 col-span-12 lg:col-span-10">
          <h1 className="font-bold text-2xl">Daftar Produk</h1>
        </div>
        <div className="p-4 col-span-12 lg:col-span-2">
          <button
            className="flex items-center gap-2 border border-orange-600 text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-600 hover:text-white transition duration-200"
            onClick={() => console.log('Tambah Produk clicked')}
          >
            <MdAddBox className="h-5 w-5" />
            Tambah Produk
          </button>
        </div>
      </div>

      <div className="px-5">
        <TableList data={products} columns={columnOfTable} />
      </div>
    </div>
  );
}

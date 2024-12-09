'use client';

import { useState } from 'react';
import { apiPostProduct } from '@/app/utils/apiAction';

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

export default function AddProductPage() {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'> & { image: string | null }>({
    name: '',
    description: '',
    package: 'SATUAN',
    totalInPackage: 0,
    image: '',
    size: '',
    harga: 0,
    isReadyStock: true,
  });
  const [useUrl, setUseUrl] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      let imageData: string | null = formData.image;
  
      if (!useUrl && file) {
        // Jika menggunakan file, ubah ke Base64
        imageData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      }
  
      const payload = {
        name: formData.name || "",
        description: formData.description || "",
        package: formData.package ?? 'SATUAN',
        totalInPackage: formData.totalInPackage ?? 0,
        image: imageData || "",
        size: formData.size || "",
        harga: formData.harga || 0,
        isReadyStock: formData.isReadyStock || false,
      };

      await apiPostProduct(payload);
      alert('Produk berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Gagal menambahkan produk.');
    }
  };
  

  return (
    <div className="bg-white py-5 px-4">
      <h1 className="font-bold text-2xl mb-4">Tambah Produk</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Paket</label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          >
            <option value="SATUAN">Satuan</option>
            <option value="DUS">Dus</option>
            <option value="KRAT">Krat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Total dalam Paket</label>
          <input
            type="number"
            name="totalInPackage"
            value={formData.totalInPackage || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            min={0}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gambar</label>
          <div className="flex items-center space-x-2 mb-2">
            <label className="text-sm font-medium">Gunakan URL</label>
            <input
              type="checkbox"
              checked={useUrl}
              onChange={() => setUseUrl(!useUrl)}
              className="ml-2"
            />
          </div>
          {useUrl ? (
            <input
              type="text"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              className="border rounded w-full px-3 py-2"
            />
          ) : (
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              className="border rounded w-full px-3 py-2"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ukuran</label>
          <input
            type="text"
            name="size"
            value={formData.size || ''}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <input
            type="number"
            name="harga"
            value={formData.harga}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
            min={0}
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isReadyStock"
            checked={formData.isReadyStock}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium">Ready Stock</label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
}

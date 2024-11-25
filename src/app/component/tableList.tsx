import React from 'react';
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

const formatCurrency = (value: number) => {
  return `Rp ${value.toLocaleString('id-ID')}`;
};

const formatBoolean = (value: boolean) => {
  return (
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full ${
        value ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}
      style={{ minWidth: '100px', textAlign: 'center' }}
    >
      {value ? 'Ya' : 'Tidak'}
    </span>
  );
};

const formatDate = (value: string) => {
  const date = new Date(value);
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatColumnValue = (type: string, value: any) => {
  switch (type) {
    case 'currency':
      return formatCurrency(Number(value));
    case 'boolean':
      return formatBoolean(Boolean(value));
    case 'date':
      return formatDate(value);
    default:
      return String(value);
  }
};

type TableListProps<T> = {
  data: T[];
  columns: { key: keyof T; label: string; type: string }[];
};

const TableList = <T,>({ data, columns }: TableListProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th>No.</th>
            {columns.map((column) => (
              <th key={String(column.key)} className="text-left px-6 py-4">
                {column.label}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-700">{rowIndex + 1}</td>
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 text-gray-700">
                  {formatColumnValue(column.type, item[column.key])}
                </td>
              ))}
              <td className="px-6 py-4 text-gray-700 flex justify-between">
                <FaRegEdit
                  className="text-blue-600 h-5 w-5 cursor-pointer hover:text-orange-600 transition-colors duration-200"
                  title="Edit Produk"
                  onClick={() => console.log('Edit Produk clicked')}
                />
                <FaTrashAlt
                  className="text-red-600 h-5 w-5 cursor-pointer hover:text-orange-600 transition-colors duration-200"
                  title="Hapus Produk"
                  onClick={() => console.log('Hapus Produk clicked')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;

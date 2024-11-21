import React from 'react';

type TableListProps<T> = {
  data: T[];
  columns: { key: keyof T; label: string }[];
};

const TableList = <T,>({ data, columns }: TableListProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="text-left px-6 py-4 font-medium text-gray-600"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 text-gray-700"
                >
                  {String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;

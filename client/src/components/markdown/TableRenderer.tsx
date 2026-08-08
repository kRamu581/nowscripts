import React from 'react';

export const Table = ({ children, className, ...props }: any) => (
  <div className={`w-full overflow-x-auto my-8 font-sans ${className || ''}`}>
    <table className="w-full border-collapse text-left text-sm border border-gray-300 shadow-sm bg-white" {...props}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, className, ...props }: any) => (
  <thead className={`bg-gray-50 border-b-2 border-gray-400 ${className || ''}`} {...props}>
    {children}
  </thead>
);

export const TableRow = ({ children, className, ...props }: any) => (
  <tr className={`border-b border-gray-200 hover:bg-gray-50/50 transition-colors ${className || ''}`} {...props}>
    {children}
  </tr>
);

export const TableHeader = ({ children, className, ...props }: any) => (
  <th className={`px-6 py-4 font-bold text-gray-800 whitespace-nowrap bg-gray-50 border-r border-gray-200 last:border-r-0 ${className || ''}`} {...props}>
    {children}
  </th>
);

export const TableCell = ({ children, className, ...props }: any) => (
  <td className={`px-6 py-4 text-gray-700 leading-relaxed border-r border-gray-200 last:border-r-0 ${className || ''}`} {...props}>
    {children}
  </td>
);

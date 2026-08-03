import React from 'react';

export const Table = ({ children, ...props }: any) => (
  <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff' }} {...props}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, ...props }: any) => (
  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }} {...props}>
    {children}
  </thead>
);

export const TableRow = ({ children, ...props }: any) => (
  <tr style={{ borderBottom: '1px solid #e5e7eb' }} {...props}>
    {children}
  </tr>
);

export const TableHeader = ({ children, ...props }: any) => (
  <th style={{
    padding: '14px 16px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '15px',
    color: '#374151',
    whiteSpace: 'nowrap',
  }} {...props}>
    {children}
  </th>
);

export const TableCell = ({ children, ...props }: any) => (
  <td style={{
    padding: '14px 16px',
    fontSize: '15px',
    color: '#4b5563',
  }} {...props}>
    {children}
  </td>
);

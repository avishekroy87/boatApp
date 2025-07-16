import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const UniqueRowsDataGrid =() => {
  // Sample data with duplicate rows
  const [rows, setRows] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Doe', age: 30 },
    { id: 1, name: 'John Doe', age: 25 }, // Duplicate row
    { id: 3, name: 'Bob Smith', age: 35 },
    { id: 2, name: 'Jane Doe', age: 30 }, // Duplicate row
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age', width: 150 },
  ];

  useEffect(() => {
    // Remove duplicate rows based on 'id'
    const uniqueRows = Array.from(new Map(rows.map((row) => [row.id, row])).values());
    setRows(uniqueRows);
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </div>
  );
}

export default UniqueRowsDataGrid;
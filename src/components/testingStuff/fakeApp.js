import React, { useState, useMemo } from 'react';
import Pagination from './fakePagination';
import data from './data/mock-data.json';


let PageSize = 10;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  console.log("FAKE APP DATA SLICE", data.slice(0,10));
  console.log("FAKE APP SIZE", PageSize);
  console.log("FAKE APP CURRPG", currentPage);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    console.log("FAKE APP FIRST", firstPageIndex);
    const lastPageIndex = firstPageIndex + PageSize;
    console.log("FAKE APP LAST", lastPageIndex);
    const dataStuff = data.slice(firstPageIndex, lastPageIndex);
    console.log("FAKE APP STUFF", dataStuff);
    return dataStuff;
  }, [currentPage]);

  console.log("FAKE APP CURR", currentTableData)
  
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.map(item => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
}
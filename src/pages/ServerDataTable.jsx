import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function ServerDataTable({ 
  columns, 
  apiConfig: {
    endpoint,
    totalItems,
    queryKey = 'table-data'
  },
  initialPageSize = 10 
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnSizing, setColumnSizing] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // Fetch data using TanStack Query
  const {
    data: queryData,
    isLoading,
    isError,
    error,
    isFetching
  } = useQuery({
    queryKey: [queryKey, pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const start = pagination.pageIndex * pagination.pageSize;
      const url = `${endpoint}?_start=${start}&_limit=${pagination.pageSize}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    keepPreviousData: true, // Keep previous data while fetching new data
    staleTime: 1000 * 60, // 1 minute
  });

  const data = queryData || [];
  const pageCount = Math.ceil(totalItems / pagination.pageSize);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnSizing,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount,
  });

  const getAlignmentClass = (alignment) => {
    switch (alignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "left":
      default:
        return "text-left";
    }
  };

  // Error state
  if (isError) {
    return (
      <div className="p-4 w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="mr-2 text-red-500" size={20} />
          <div className="text-red-700">
            <p className="font-semibold">Error loading data</p>
            <p className="text-sm">{error?.message || 'An error occurred'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      <div className="overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="divide-x divide-gray-200">
                {headerGroup.headers.map((header) => {
                  const alignment = header.column.columnDef.align || "left";
                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className={`px-6 py-4 bg-gray-50 font-semibold text-gray-600 text-xs tracking-wider select-none relative group border-b border-gray-200 transition-colors duration-200 hover:bg-gray-100`}
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          alignment === "center"
                            ? "justify-center"
                            : alignment === "right"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className="cursor-pointer uppercase"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                        {header.column.getCanSort() && (
                          <ArrowUpDown
                            size={14}
                            className={`text-gray-400 cursor-pointer ${
                              header.column.getIsSorted() === "asc"
                                ? ""
                                : header.column.getIsSorted() === "desc"
                                ? "rotate-180"
                                : ""
                            } transition-transform duration-200`}
                          />
                        )}
                      </div>

                      {/* Resize handle */}
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className="absolute right-0 top-0 h-full w-1 bg-primary-400 opacity-0 group-hover:opacity-100 cursor-col-resize transition-opacity duration-200"
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {isLoading && data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Loading data...
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No data available for this page.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`divide-x divide-gray-200 transition-colors duration-150 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-primary-50 ${isFetching ? 'opacity-60' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => {
                    const alignment = cell.column.columnDef.align || "left";
                    return (
                      <td
                        key={cell.id}
                        className={`px-6 py-4 whitespace-nowrap ${getAlignmentClass(
                          alignment
                        )} text-gray-700`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-4">
          <div className="whitespace-nowrap">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </div>
          <div className="whitespace-nowrap text-gray-500 flex items-center gap-2">
            Showing <strong>{data.length}</strong> of <strong>{totalItems}</strong> total results
            {isFetching && (
              <>
                <Loader2 className="animate-spin" size={14} />
                <span className="text-blue-500">Fetching...</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Rows per page:</label>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              disabled={isFetching}
              className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-700 hover:border-gray-400 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {[10, 20, 30, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
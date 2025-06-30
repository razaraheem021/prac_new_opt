import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

export default function DataTable({ 
  data, 
  columns, 
  // Server-side pagination props
  manualPagination = false,
  pageCount: serverPageCount = -1,
  pagination: externalPagination,
  onPaginationChange 
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnSizing, setColumnSizing] = React.useState({});
  
  // Use external pagination state if provided, otherwise use internal state
  const [internalPagination, setInternalPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  
  const pagination = manualPagination ? externalPagination : internalPagination;
  const setPagination = manualPagination ? onPaginationChange : setInternalPagination;
  
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Custom filter function for better string matching
  const customGlobalFilterFn = React.useCallback((row, columnId, value) => {
    const search = value.toLowerCase();
    return Object.values(row.original).some((field) =>
      String(field).toLowerCase().includes(search)
    );
  }, []);

  // Custom column filter function
  const customColumnFilterFn = React.useCallback((row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    return String(cellValue).toLowerCase().includes(value.toLowerCase());
  }, []);

  const processedColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        align: column.align || "left",
        enableColumnFilter: !manualPagination, // Disable column filters for server-side pagination
        filterFn: customColumnFilterFn,
      })),
    [columns, customColumnFilterFn, manualPagination]
  );

  const table = useReactTable({
    data,
    columns: processedColumns,
    state: {
      sorting,
      columnSizing,
      pagination,
      globalFilter: manualPagination ? "" : globalFilter, // Disable global filter for server-side pagination
      columnFilters: manualPagination ? [] : columnFilters, // Disable column filters for server-side pagination
    },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    onGlobalFilterChange: manualPagination ? undefined : setGlobalFilter,
    onColumnFiltersChange: manualPagination ? undefined : setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: manualPagination ? undefined : getFilteredRowModel(),
    globalFilterFn: manualPagination ? undefined : customGlobalFilterFn,
    enableGlobalFilter: !manualPagination,
    enableColumnFilters: !manualPagination,
    // Server-side pagination configuration
    manualPagination: manualPagination,
    pageCount: manualPagination ? serverPageCount : undefined,
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

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      {/* Global Search bar - only show for client-side pagination */}
      {!manualPagination && (
        <div className="relative mb-4">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
      )}

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
                      {/* Header content */}
                      <div className="flex flex-col gap-2">
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

                        {/* Column filter - only show for client-side pagination */}
                        {header.column.getCanFilter() && !manualPagination && (
                          <div className="relative">
                            <input
                              type="text"
                              value={header.column.getFilterValue() ?? ""}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                              placeholder={`Search ${header.column.columnDef.header}`}
                              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                            />
                            {header.column.getFilterValue() && (
                              <button
                                onClick={() => header.column.setFilterValue("")}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {manualPagination 
                    ? "No data available for this page."
                    : "No data found matching your search criteria."
                  }
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`divide-x divide-gray-200 transition-colors duration-150 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-primary-50`}
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
          <div className="whitespace-nowrap text-gray-500">
            {manualPagination ? (
              // Server-side pagination statistics
              <>
                Showing <strong>{table.getRowModel().rows.length}</strong> results per page
                {serverPageCount > 0 && (
                  <span> (Total pages: {serverPageCount})</span>
                )}
              </>
            ) : (
              // Client-side pagination statistics
              <>
                Showing <strong>{table.getRowModel().rows.length}</strong> of{" "}
                <strong>{table.getFilteredRowModel().rows.length}</strong> filtered results
                {table.getFilteredRowModel().rows.length !== data.length && (
                  <span> (from {data.length} total)</span>
                )}
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
              className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-gray-700 hover:border-gray-400 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
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
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 hover:cursor-pointer border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
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

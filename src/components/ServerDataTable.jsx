import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  Loader2,
  AlertCircle,
  Search,
  X,
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
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
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
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  const data = queryData || [];
  const pageCount = Math.ceil(totalItems / pagination.pageSize);

  // Custom filter functions
  const customGlobalFilterFn = React.useCallback((row, columnId, value) => {
    const search = value.toLowerCase();
    return Object.values(row.original).some((field) =>
      String(field).toLowerCase().includes(search)
    );
  }, []);

  const customColumnFilterFn = React.useCallback((row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    return String(cellValue).toLowerCase().includes(value.toLowerCase());
  }, []);

  const processedColumns = React.useMemo(
    () =>
      columns.map((column, index) => ({
        ...column,
        align: column.align || "left",
        enableColumnFilter: true,
        enableSorting: true,
        enableResizing: true,
        filterFn: customColumnFilterFn,
        // Set default sizes if not provided
        size: column.size || (() => {
          // Auto-calculate based on column type and content
          switch (column.accessorKey) {
            case 'id': return 80;
            case 'userId': return 100;
            case 'title': return 300;
            case 'body': return 400;
            default: return 150;
          }
        })(),
        minSize: column.minSize || 80,
        maxSize: column.maxSize || 800,
      })),
    [columns, customColumnFilterFn]
  );

  const table = useReactTable({
    data,
    columns: processedColumns,
    state: {
      sorting,
      columnSizing,
      pagination,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnSizingChange: setColumnSizing,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: customGlobalFilterFn,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    enableSorting: true,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    manualPagination: true,
    manualSorting: false,
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
        <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="mr-2 text-red-500 dark:text-red-400" size={20} />
          <div className="text-red-700 dark:text-red-300">
            <p className="font-semibold">Error loading data</p>
            <p className="text-sm">{error?.message || 'An error occurred'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {/* Global Search bar */}
      <div className="relative mb-4">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search all columns on current page..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
          size={16}
        />
        {globalFilter && (
          <button
            onClick={() => setGlobalFilter("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter and sorting indicators */}
      {(globalFilter || columnFilters.length > 0 || sorting.length > 0) && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> Filters and sorting only apply to the current page data ({data.length} items). 
            To search or sort all {totalItems} items, navigate through pages or use server-side operations if available.
          </p>
        </div>
      )}

      <div className="overflow-x-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl">
        <table 
          className="w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300"
          style={{ 
            width: '100%',
            tableLayout: 'fixed'
          }}
        >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="divide-x divide-gray-200 dark:divide-gray-700">
                  {headerGroup.headers.map((header) => {
                    const alignment = header.column.columnDef.align || "left";
                    return (
                      <th
                        key={header.id}
                        style={{ 
                          width: `${header.getSize()}px`,
                          minWidth: `${header.column.columnDef.minSize || 80}px`,
                          position: 'relative'
                        }}
                        className="px-6 py-4 bg-gray-50 dark:bg-gray-900 font-semibold text-gray-600 dark:text-gray-300 text-xs tracking-wider select-none border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                              className="cursor-pointer uppercase flex-1"
                              onClick={(e) => {
                                e.preventDefault();
                                header.column.getToggleSortingHandler()?.(e);
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            {header.column.getCanSort() && (
                              <div
                                className={`cursor-pointer transition-all duration-200 ${
                                  header.column.getIsSorted() === "asc"
                                    ? "text-blue-500 dark:text-blue-400"
                                    : header.column.getIsSorted() === "desc"
                                    ? "text-blue-500 dark:text-blue-400 rotate-180"
                                    : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  header.column.getToggleSortingHandler()?.(e);
                                }}
                              >
                                <ArrowUpDown size={14} />
                              </div>
                            )}
                          </div>

                          {/* Column filter */}
                          {header.column.getCanFilter() && (
                            <div className="relative">
                              <input
                                type="text"
                                value={header.column.getFilterValue() ?? ""}
                                onChange={(e) =>
                                  header.column.setFilterValue(e.target.value)
                                }
                                placeholder={`Search ${header.column.columnDef.header}`}
                                className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              />
                              {header.column.getFilterValue() && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    header.column.setFilterValue("");
                                  }}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                  <X size={12} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Resize handle */}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`absolute top-0 h-full cursor-col-resize transition-all duration-200 ${
                              header.column.getIsResizing() 
                                ? 'bg-blue-500 dark:bg-blue-400 opacity-100 w-1' 
                                : 'bg-gray-400 dark:bg-gray-500 opacity-0 hover:opacity-100 w-1 hover:w-2'
                            }`}
                            style={{
                              right: '-2px',
                              userSelect: 'none',
                              touchAction: 'none',
                              zIndex: 10,
                            }}
                          />
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading && data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
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
                    className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    {table.getFilteredRowModel().rows.length === 0 && data.length > 0
                      ? "No data matches your search criteria on this page."
                      : "No data available for this page."
                    }
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`divide-x divide-gray-200 dark:divide-gray-700 transition-colors duration-150 ${
                      idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
                    } hover:bg-blue-50 dark:hover:bg-blue-900/20 ${isFetching ? 'opacity-60' : ''}`}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const alignment = cell.column.columnDef.align || "left";
                      return (
                        <td
                          key={cell.id}
                          style={{ 
                            width: `${cell.column.getSize()}px`,
                            minWidth: `${cell.column.columnDef.minSize || 80}px`
                          }}
                          className={`px-6 py-4 ${getAlignmentClass(
                            alignment
                          )} text-gray-700 dark:text-gray-300`}
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
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center gap-4">
          <div className="whitespace-nowrap">
            Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
            <strong>{table.getPageCount()}</strong>
          </div>
          <div className="whitespace-nowrap text-gray-500 dark:text-gray-400 flex items-center gap-2">
            Showing <strong>{table.getRowModel().rows.length}</strong> of{" "}
            <strong>{table.getFilteredRowModel().rows.length}</strong> filtered results
            {table.getFilteredRowModel().rows.length !== data.length && (
              <span> (from {data.length} on this page, {totalItems} total)</span>
            )}
            {table.getFilteredRowModel().rows.length === data.length && (
              <span> (from {totalItems} total)</span>
            )}
            {isFetching && (
              <>
                <Loader2 className="animate-spin" size={14} />
                <span className="text-blue-500 dark:text-blue-400">Fetching...</span>
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
              className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage() || isFetching}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:cursor-pointer border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
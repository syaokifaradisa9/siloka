import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onSearch?: (query: string) => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    totalData: number;
    currentPage: number;
    itemsPerPage: number;
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    onIndividualColumnFilterChange: (columnId: string, value: string) => void;
}

export function DataTable<TData, TValue>({
    columns: columnsProp,
    data,
    onSearch,
    onPaginationChange,
    totalData,
    currentPage,
    itemsPerPage,
    columnFilters,
    setColumnFilters,
    sorting,
    setSorting,
    onIndividualColumnFilterChange,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: currentPage - 1,
        pageSize: itemsPerPage,
    });

    const table = useReactTable({
        data,
        columns: columnsProp,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: (updater) => {
            setColumnFilters(updater);
            if (onPaginationChange) {
                onPaginationChange(1, table.getState().pagination.pageSize);
            }
        },
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        manualPagination: true, // We'll handle pagination externally with React Query
        manualFiltering: true, // We'll handle filtering externally with React Query
        manualSorting: true, // We'll handle sorting externally with React Query
        rowCount: totalData, // Total number of rows for pagination
    });

    // Effect to sync external pagination changes with internal state
    React.useEffect(() => {
        table.setPageIndex(currentPage - 1);
        table.setPageSize(itemsPerPage);
    }, [currentPage, itemsPerPage, table]);

    const handlePageSizeChange = (value: string) => {
        const newSize = Number(value);
        table.setPageSize(newSize);
        if (onPaginationChange) {
            onPaginationChange(1, newSize); // Reset to first page when page size changes
        }
    };

    const handleGlobalSearch = (query: string) => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm">Tampilkan</span>
                    <Select onValueChange={handlePageSizeChange} value={String(itemsPerPage)} key={itemsPerPage}>
                        <SelectTrigger className="w-[80px]">
                            <SelectValue>{String(itemsPerPage)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm">Per Halaman</span>
                </div>
                <div className="relative flex items-center space-x-2">
                    <Input type="search" placeholder="Cari data..." className="w-64" onChange={(e) => handleGlobalSearch(e.target.value)} />
                    <button className="cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Edit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-square-pen"
                        >
                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z" />
                        </svg>
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="cursor-pointer rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Print">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-printer"
                                >
                                    <polyline points="6 9 6 2 18 2 18 9" />
                                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                    <rect width="12" height="8" x="6" y="14" />
                                </svg>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-[9999]">
                            <DropdownMenuItem onClick={() => console.log('PDF clicked')}>PDF</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log('Excel clicked')}>Excel</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="px-4 py-2 text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            {table.getFooterGroups().map((footerGroup) => (
                                <TableRow key={footerGroup.id}>
                                    {footerGroup.headers.map((header) => (
                                        <TableCell key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.footer, {
                                                      ...header.getContext(),
                                                      columnFilters: columnFilters,
                                                      onIndividualColumnFilterChange: onIndividualColumnFilterChange,
                                                  })}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-sm">
                        Menampilkan {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
                        {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, totalData)} dari {totalData}{' '}
                        Data
                    </span>
                </div>
                <div className="ml-auto flex space-x-1">
                    <button
                        className="cursor-pointer rounded-md border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                            if (onPaginationChange) {
                                void onPaginationChange(table.getState().pagination.pageIndex, table.getState().pagination.pageSize);
                            }
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </button>
                    {Array.from({ length: table.getPageCount() }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`cursor-pointer rounded-md border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                table.getState().pagination.pageIndex + 1 === page
                                    ? 'bg-orange-500 text-white hover:bg-orange-500 dark:hover:bg-orange-500'
                                    : ''
                            }`}
                            onClick={() => {
                                if (onPaginationChange) {
                                    void onPaginationChange(page, table.getState().pagination.pageSize);
                                }
                            }}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="cursor-pointer rounded-md border px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => {
                            if (onPaginationChange) {
                                void onPaginationChange(table.getState().pagination.pageIndex + 2, table.getState().pagination.pageSize);
                            }
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

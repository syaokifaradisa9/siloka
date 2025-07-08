import { DataTable } from '@/components/DataTable';
import RootLayout from '@/components/RootLayout';
import { useQuery } from '@tanstack/react-query';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import React, { useState } from 'react';
import { getColumns } from './columns';

interface UserIndexProps {
    divisions: { id: number; name: string }[];
}

export default function UserIndex({ divisions }: UserIndexProps) {
    const [query, setQuery] = useState({
        page: 1,
        per_page: 5,
        search: '',
        filters: [] as ColumnFiltersState,
        sort: [] as SortingState,
    });

    const fetchUsersData = async ({ queryKey }: { queryKey: [string, typeof query] }) => {
        const [_, { page, per_page, search, filters, sort }] = queryKey;
        const params = {
            page: String(page),
            per_page: String(per_page),
            search: String(search),
            ...Object.fromEntries(
                filters
                    .filter((filter): filter is { id: string; value: string | number | boolean } => {
                        return typeof filter.value === 'string' || typeof filter.value === 'number' || typeof filter.value === 'boolean';
                    })
                    .map((filter) => [filter.id, String(filter.value)]),
            ),
            sort_by: String(sort.length > 0 ? sort[0].id : ''),
            sort_type: String(sort.length > 0 ? (sort[0].desc ? 'desc' : 'asc') : ''),
        };
        const queryParams = new URLSearchParams(params).toString();

        const response = await fetch(`/users/datatable?${queryParams}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };

    const handleColumnFiltersChange = (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
        setQuery((prev) => {
            const newFilters = typeof updater === 'function' ? updater(prev.filters) : updater;
            return { ...prev, filters: newFilters, page: 1 };
        });
    };

    const handleIndividualColumnFilterChange = (columnId: string, value: string) => {
        setQuery((prev) => {
            const newFilters = prev.filters.filter((filter) => filter.id !== columnId);
            if (value) {
                newFilters.push({ id: columnId, value: value });
            }
            return { ...prev, filters: newFilters, page: 1 };
        });
    };

    const handleSortingChange = (updater: React.SetStateAction<SortingState>) => {
        setQuery((prev) => {
            const newSort = typeof updater === 'function' ? updater(prev.sort) : updater;
            return { ...prev, sort: newSort };
        });
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', query],
        queryFn: fetchUsersData,
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    });

    const columns = React.useMemo(() => getColumns(divisions), [divisions]);

    const handleSearch = (searchQuery: string) => {
        setQuery((prev) => ({ ...prev, search: searchQuery, page: 1 }));
    };

    const handlePaginationChange = (page: number, pageSize: number) => {
        setQuery((prev) => ({ ...prev, page, per_page: pageSize }));
    };

    const handlePrintPdf = () => {
        const params = {
            search: String(query.search),
            ...Object.fromEntries(
                query.filters
                    .filter((filter): filter is { id: string; value: string | number | boolean } => {
                        return typeof filter.value === 'string' || typeof filter.value === 'number' || typeof filter.value === 'boolean';
                    })
                    .map((filter) => [filter.id, String(filter.value)]),
            ),
            sort_by: String(query.sort.length > 0 ? query.sort[0].id : ''),
            sort_type: String(query.sort.length > 0 ? (query.sort[0].desc ? 'desc' : 'asc') : ''),
        };
        const queryParams = new URLSearchParams(params).toString();
        window.open(`/users/print/pdf?${queryParams}`, '_blank');
    };

    const handlePrintExcel = () => {
        const params = {
            search: String(query.search),
            ...Object.fromEntries(
                query.filters
                    .filter((filter): filter is { id: string; value: string | number | boolean } => {
                        return typeof filter.value === 'string' || typeof filter.value === 'number' || typeof filter.value === 'boolean';
                    })
                    .map((filter) => [filter.id, String(filter.value)]),
            ),
            sort_by: String(query.sort.length > 0 ? query.sort[0].id : ''),
            sort_type: String(query.sort.length > 0 ? (query.sort[0].desc ? 'desc' : 'asc') : ''),
        };
        const queryParams = new URLSearchParams(params).toString();
        window.open(`/users/print/excel?${queryParams}`, '_blank');
    };

    return (
        <RootLayout title="Manajemen User" description="Kelola semua pengguna yang terdaftar di sistem Anda.">
            <DataTable
                columns={columns}
                data={data?.data || []}
                onSearch={handleSearch}
                onPaginationChange={handlePaginationChange}
                totalData={data?.total || 0}
                currentPage={data?.current_page || 1}
                itemsPerPage={query.per_page}
                columnFilters={query.filters}
                setColumnFilters={handleColumnFiltersChange}
                sorting={query.sort}
                setSorting={handleSortingChange}
                onIndividualColumnFilterChange={handleIndividualColumnFilterChange}
                onPrintPdf={handlePrintPdf}
                onPrintExcel={handlePrintExcel}
            />
        </RootLayout>
    );
}

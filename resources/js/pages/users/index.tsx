import { DataTable } from '@/components/DataTable';
import RootLayout from '@/components/RootLayout';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
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
        const [, { page, per_page, search, filters, sort }] = queryKey;
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

    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ['users', query],
        queryFn: fetchUsersData,
        placeholderData: (previousData) => previousData,
        staleTime: 5 * 60 * 1000,
    });

    const handleDelete = (id: number) => {
        toast(
            (t) => (
                <div className="flex flex-col items-center gap-4">
                    <div className="font-bold">Are you sure you want to delete this user?</div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => {
                                router.delete(route('users.destroy', id), {
                                    onSuccess: () => {
                                        toast.success('User deleted successfully');
                                        queryClient.invalidateQueries({ queryKey: ['users'] });
                                    },
                                    onError: () => {
                                        toast.error('Failed to delete user');
                                    },
                                });
                                toast.dismiss(t.id);
                            }}
                            className="bg-red-500 text-white"
                        >
                            Delete
                        </Button>
                        <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
                    </div>
                </div>
            ),
            {
                duration: 6000,
            },
        );
    };

    const columns = React.useMemo(() => getColumns(divisions, handleDelete), [divisions]);

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

    const pageHeaderRightContent = (
        <Button asChild>
            <Link href={route('users.create')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Data
            </Link>
        </Button>
    );
    return (
        <RootLayout
            title="Manajemen User"
            description="Kelola semua pengguna yang terdaftar di sistem Anda."
            pageHeaderRightContent={pageHeaderRightContent}
        >
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

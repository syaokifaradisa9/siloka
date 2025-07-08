import { ColumnFilterInput } from '@/components/ColumnFilterInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColumnDef, Table } from '@tanstack/react-table';

export const getColumns = <TData, TValue>(divisions: { id: number; name: string }[]): ColumnDef<TData, TValue>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <button className="flex items-center space-x-1" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    {column.getIsSorted() === 'asc' ? (
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
                            className="lucide lucide-arrow-up"
                        >
                            <path d="m5 12 7-7 7 7" />
                            <path d="M12 19V5" />
                        </svg>
                    ) : column.getIsSorted() === 'desc' ? (
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
                            className="lucide lucide-arrow-down"
                        >
                            <path d="m19 12-7 7-7-7" />
                            <path d="M12 5v14" />
                        </svg>
                    ) : (
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
                            className="lucide lucide-arrow-down-up"
                        >
                            <path d="m3 16 4 4 4-4" />
                            <path d="M7 20V4" />
                            <path d="m21 8-4-4-4 4" />
                            <path d="M17 4v16" />
                        </svg>
                    )}
                </button>
            );
        },
        enableSorting: true,
        footer: (props: {
            table: Table<TData>;
            columnFilters: ColumnFiltersState;
            onIndividualColumnFilterChange: (columnId: string, value: string) => void;
        }) => (
            <ColumnFilterInput
                placeholder="Filter Name"
                value={(props.columnFilters.find((filter) => filter.id === 'name')?.value as string) || ''}
                onChange={(value) => props.onIndividualColumnFilterChange('name', value)}
            />
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <button className="flex items-center space-x-1" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Email
                    {column.getIsSorted() === 'asc' ? (
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
                            className="lucide lucide-arrow-up"
                        >
                            <path d="m5 12 7-7 7 7" />
                            <path d="M12 19V5" />
                        </svg>
                    ) : column.getIsSorted() === 'desc' ? (
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
                            className="lucide lucide-arrow-down"
                        >
                            <path d="m19 12-7 7-7-7" />
                            <path d="M12 5v14" />
                        </svg>
                    ) : (
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
                            className="lucide lucide-arrow-down-up"
                        >
                            <path d="m3 16 4 4 4-4" />
                            <path d="M7 20V4" />
                            <path d="m21 8-4-4-4 4" />
                            <path d="M17 4v16" />
                        </svg>
                    )}
                </button>
            );
        },
        enableSorting: true,
        footer: (props: {
            table: Table<TData>;
            columnFilters: ColumnFiltersState;
            onIndividualColumnFilterChange: (columnId: string, value: string) => void;
        }) => (
            <ColumnFilterInput
                placeholder="Filter Email"
                value={(props.columnFilters.find((filter) => filter.id === 'email')?.value as string) || ''}
                onChange={(value) => props.onIndividualColumnFilterChange('email', value)}
            />
        ),
    },
    {
        accessorKey: 'division.name',
        id: 'division.name',
        header: ({ column }) => {
            return (
                <button className="flex items-center space-x-1" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Division
                    {column.getIsSorted() === 'asc' ? (
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
                            className="lucide lucide-arrow-up"
                        >
                            <path d="m5 12 7-7 7 7" />
                            <path d="M12 19V5" />
                        </svg>
                    ) : column.getIsSorted() === 'desc' ? (
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
                            className="lucide lucide-arrow-down"
                        >
                            <path d="m19 12-7 7-7-7" />
                            <path d="M12 5v14" />
                        </svg>
                    ) : (
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
                            className="lucide lucide-arrow-down-up"
                        >
                            <path d="m3 16 4 4 4-4" />
                            <path d="M7 20V4" />
                            <path d="m21 8-4-4-4 4" />
                            <path d="M17 4v16" />
                        </svg>
                    )}
                </button>
            );
        },
        cell: ({ row }) => {
            const division = row.original.division;
            return division ? division.name : '-';
        },
        enableSorting: true,
        footer: (props: {
            table: Table<TData>;
            columnFilters: ColumnFiltersState;
            onIndividualColumnFilterChange: (columnId: string, value: string) => void;
        }) => {
            const selectedValue = (props.columnFilters.find((filter) => filter.id === 'division_id')?.value as string) || '0';
            console.log('Selected Division Value:', selectedValue);
            return (
                <Select onValueChange={(value) => props.onIndividualColumnFilterChange('division_id', value)} value={String(selectedValue)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Divisi">
                            {selectedValue === '0'
                                ? 'Semua Divisi'
                                : divisions.find((d) => String(d.id) === selectedValue)?.name || 'Pilih Divisi'}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Semua Divisi</SelectItem>
                        {divisions.map((division) => (
                            <SelectItem key={division.id} value={String(division.id)}>
                                {division.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        },
    },
    {
        accessorKey: 'division_id',
        header: () => null, // Hidden header
        cell: () => null, // Hidden cell
        enableHiding: true,
        enableColumnFilter: true,
    },
];

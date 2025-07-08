import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

export const getColumns = <TData extends User, TValue>(
    divisions: { id: number; name: string }[],
    handleDelete: (id: number) => void,
): ColumnDef<TData, TValue>[] => [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <button className="flex items-center space-x-1" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nama
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
    },
    {
        accessorKey: 'division.name',
        id: 'division.name',
        header: ({ column }) => {
            return (
                <button className="flex items-center space-x-1" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Divisi
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
    },
    {
        accessorKey: 'division_id',
        header: () => null, // Hidden header
        cell: () => null, // Hidden cell
        enableHiding: true,
        enableColumnFilter: true,
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex items-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={route('users.edit', user.id)}>
                                        <Pencil className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        },
    },
];

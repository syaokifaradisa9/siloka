import { columns } from './columns';
import RootLayout from '@/components/RootLayout';
import { User } from '@/types';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function UserIndex() {
    const { data, isLoading, isError } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get('/api/users');
            return response.data;
        },
    });

    return (
        <RootLayout title="Manajemen User" description="Kelola semua pengguna yang terdaftar di sistem Anda.">
            <DataTable columns={columns} data={data || []} isLoading={isLoading} isError={isError} />
        </RootLayout>
    );
}

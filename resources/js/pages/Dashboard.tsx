import { DataTable } from '@/components/DataTable';
import RootLayout from '@/components/RootLayout';
import { useState } from 'react';

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filters, setFilters] = useState({});

    const data = [
        {
            id: 1,
            nama: 'Alat Hisap Medik / Suction Pump',
            tarif: '144.000',
            estimasi_pekerjaan: '55 Menit',
            pengujian_kan: 'Tidak',
            kalibrasi_kan: 'Ya',
            alat_datang: 'Ya',
            insitu: 'Ya',
            tuntung_saharian: 'Ya',
        },
        {
            id: 2,
            nama: 'Analytical Balance',
            tarif: '180.000',
            estimasi_pekerjaan: '55 Menit',
            pengujian_kan: 'Tidak',
            kalibrasi_kan: 'Tidak',
            alat_datang: 'Ya',
            insitu: 'Ya',
            tuntung_saharian: 'Tidak',
        },
        {
            id: 3,
            nama: 'Anasthesi Ventilator',
            tarif: '396.000',
            estimasi_pekerjaan: '90 Menit',
            pengujian_kan: 'Tidak',
            kalibrasi_kan: 'Tidak',
            alat_datang: 'Ya',
            insitu: 'Ya',
            tuntung_saharian: 'Tidak',
        },
        {
            id: 4,
            nama: 'Audiometer',
            tarif: '396.000',
            estimasi_pekerjaan: '75 Menit',
            pengujian_kan: 'Tidak',
            kalibrasi_kan: 'Tidak',
            alat_datang: 'Ya',
            insitu: 'Ya',
            tuntung_saharian: 'Tidak',
        },
        {
            id: 5,
            nama: 'Autoclave',
            tarif: '312.000',
            estimasi_pekerjaan: '95 Menit',
            pengujian_kan: 'Tidak',
            kalibrasi_kan: 'Tidak',
            alat_datang: 'Ya',
            insitu: 'Ya',
            tuntung_saharian: 'Tidak',
        },
    ];

    const columns = [
        {
            key: 'chevron',
            header: '',
            render: () => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            ),
        },
        { key: 'nama', header: 'Nama' },
        { key: 'tarif', header: 'Tarif (Rp.)' },
        { key: 'estimasi_pekerjaan', header: 'Estimasi Pekerjaan' },
        {
            key: 'pengujian_kan',
            header: 'Pengujian KAN',
            render: (item) => <span className={item.pengujian_kan === 'Tidak' ? 'text-red-500' : 'text-green-500'}>{item.pengujian_kan}</span>,
        },
        {
            key: 'kalibrasi_kan',
            header: 'Kalibrasi KAN',
            render: (item) => <span className={item.kalibrasi_kan === 'Tidak' ? 'text-red-500' : 'text-green-500'}>{item.kalibrasi_kan}</span>,
        },
        {
            key: 'alat_datang',
            header: 'Alat Datang',
            render: (item) => <span className={item.alat_datang === 'Tidak' ? 'text-red-500' : 'text-green-500'}>{item.alat_datang}</span>,
        },
        {
            key: 'insitu',
            header: 'Insitu',
            render: (item) => <span className={item.insitu === 'Tidak' ? 'text-red-500' : 'text-green-500'}>{item.insitu}</span>,
        },
        {
            key: 'tuntung_saharian',
            header: 'Tuntung Saharian',
            render: (item) => <span className={item.tuntung_saharian === 'Tidak' ? 'text-red-500' : 'text-green-500'}>{item.tuntung_saharian}</span>,
        },
        {
            key: 'aksi',
            header: 'Aksi',
            render: () => (
                <button className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
            ),
        },
    ];

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // In a real application, you would filter your data here
        console.log('Search query:', query);
    };

    const handlePaginationChange = (page: number) => {
        setCurrentPage(page);
        // In a real application, you would fetch data for the new page here
        console.log('Current page:', page);
    };

    const handleFilterChange = (filter: string, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
        // In a real application, you would filter your data here
        console.log('Filter changed:', filter, value);
    };

    return (
        <RootLayout title="Dashboard">
            <DataTable
                columns={columns}
                data={data}
                onSearch={handleSearch}
                onPaginationChange={handlePaginationChange}
                onFilterChange={handleFilterChange}
                totalData={107} // Example total data
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />
        </RootLayout>
    );
}

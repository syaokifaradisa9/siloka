import RootLayout from '@/components/RootLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageProps, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import { Division } from '../../types/division';

interface FormProps extends PageProps {
    user?: User;
    divisions: Division[];
}

export default function UserForm({ user, divisions }: FormProps) {
    const queryClient = useQueryClient();
    const { data, setData, post, put, errors, processing } = useForm({
        name: user?.name,
        email: user?.email,
        password: '',
        password_confirmation: '',
        division_id: user?.division_id?.toString(),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
                toast.success(user ? 'User updated successfully' : 'User created successfully');
            },
        };
        if (user) {
            put(route('users.update', user.id), options);
        } else {
            post(route('users.store'), options);
        }
    };

    const titleContent = (
        <div className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Link href={route('users.index')}>
                    <ChevronLeft className="h-5 w-5" />
                </Link>
            </Button>
            <div>
                <h1 className="text-[16pt] font-bold text-gray-900 dark:text-gray-300">{user ? 'Ubah Pengguna' : 'Tambah Pengguna'}</h1>
                <p className="text-[11pt] font-thin text-gray-700 dark:text-gray-400">
                    {user ? 'Ubah data pengguna yang sudah ada.' : 'Buat pengguna baru dengan mengisi formulir di bawah ini.'}
                </p>
            </div>
        </div>
    );

    return (
        <RootLayout title={titleContent} description="">
            <Head title={user ? 'Ubah Pengguna' : 'Tambah Pengguna'} />
            <Card>
                <CardHeader>
                    <CardTitle>{user ? 'Ubah Pengguna' : 'Tambah Pengguna'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>
                        <div>
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="division_id">Division</Label>
                            <Select value={String(data.division_id)} onValueChange={(value) => setData('division_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Divisi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {divisions.map((division) => (
                                        <SelectItem key={division.id} value={String(division.id)}>
                                            {division.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.division_id && <p className="mt-1 text-sm text-red-500">{errors.division_id}</p>}
                        </div>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </RootLayout>
    );
}

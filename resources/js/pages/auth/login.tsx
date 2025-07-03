import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#FDF8EE]">
            <Card className="hover:shadow-3xl mx-auto min-w-md rounded-xl border border-gray-200 bg-white text-black shadow-2xl transition-all duration-300">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">SILOKA</CardTitle>
                    <CardDescription className="text-gray-600">Sistem Informasi Kelola Logistik Kantor</CardDescription>
                </CardHeader>
                <CardContent className="mt-4 px-6 py-4">
                    <form onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Isikan email akun"
                                    required
                                    className="bg-opacity-50 focus:ring-0.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-800 transition-all duration-200 outline-none focus:border-orange-400 focus:ring-orange-400"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        placeholder="Isikan password"
                                        className="bg-opacity-50 focus:ring-0.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-800 transition-all duration-200 outline-none focus:border-orange-400 focus:ring-orange-400"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <Button
                                        variant="link"
                                        className="absolute top-0 right-0 h-full cursor-pointer text-sm text-gray-500 transition-colors duration-200 hover:text-orange-500"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full transform cursor-pointer rounded-md bg-orange-400 py-2 text-white transition-colors duration-200 hover:scale-105 hover:bg-orange-500"
                                disabled={processing}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="absolute bottom-6 text-center text-sm text-gray-500">&copy; Nocturnal Projects 2025</div>
        </div>
    );
}

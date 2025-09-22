'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/context/auth';
import { Role } from '@/lib/roles';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Warehouse } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState('');
  const { setRole: setCtxRole } = useCurrentUser();

  const mapRole = (value: string): Role => {
    switch (value) {
      case 'admin':
        return 'Administracion';
      case 'manager':
        return 'Operaciones';
      case 'receiving':
        return 'Recepcion';
      case 'operator':
        return 'Operaciones';
      default:
        return 'Recepcion';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mapped = mapRole(role);
    setCtxRole(mapped);

    // Redirect by role
    if (mapped === 'Recepcion') router.push('/receiving');
    else if (mapped === 'Administracion') router.push('/dashboard');
    else if (mapped === 'Operaciones') router.push('/inventory');
    else router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Warehouse className="w-10 h-10 text-primary" />
            <h1 className="text-3xl font-bold">PharmaFlow</h1>
          </div>
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="admin@pharmaflow.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Rol</Label>
              <Select onValueChange={setRole} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="receiving">Recepcionista</SelectItem>
                  <SelectItem value="operator">Operador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

'use server'
import { auth } from "@/auth.config";
import { useRouter } from 'next/router';

export default async function UserUuId(): Promise<string | null> {
  const router = useRouter();
  const session = await auth();

  if (!session?.user) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    router.push("/");
    return null; // Retorna null para indicar que el usuario no está autenticado
  }

  return session.user.id; // Retorna el nombre del usuario si está autenticado
}

 
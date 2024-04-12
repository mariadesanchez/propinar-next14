import { auth } from "@/auth.config";
import { useRouter } from 'next/router';

export default async function UserAuth(): Promise<string | null> {
  const router = useRouter();
  const session = await auth();

  if (!session?.user) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    router.push("/");
    return null; // Retorna null para indicar que el usuario no está autenticado
  }

  return session.user.name; // Retorna el nombre del usuario si está autenticado
}

 
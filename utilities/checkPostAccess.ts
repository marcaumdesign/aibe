import { getMeUser } from './getMeUser';
import { canAccessPost, getUserAccessLevel } from './subscription';
import type { User } from '@/payload-types';

interface Post {
  accessLevel?: string | null;
  isPremium?: boolean;
}

interface AccessCheckResult {
  hasAccess: boolean;
  user: User | null;
  isLoggedIn: boolean;
  userAccessLevel: 'free' | 'premium' | 'founders';
  requiredLevel: 'free' | 'premium' | 'founders';
}

/**
 * Verifica se o usuário atual tem acesso a um post
 * Esta função deve ser chamada em Server Components
 *
 * @param post - Post com campo accessLevel
 * @returns Objeto com informações de acesso
 */
export async function checkPostAccess(post: Post): Promise<AccessCheckResult> {
  // Tenta obter o usuário autenticado (não redireciona se não estiver logado)
  let user: User | null = null;
  let isLoggedIn = false;

  try {
    const meUser = await getMeUser();
    user = meUser.user as User;
    isLoggedIn = true;
  } catch (error) {
    // Usuário não está logado, continua com user = null
  }

  // Determina o nível de acesso necessário
  const requiredLevel = (post.accessLevel || 'free') as
    | 'free'
    | 'premium'
    | 'founders';

  // Verifica se o usuário tem acesso
  const hasAccess = canAccessPost(user, post);

  // Obtém o nível de acesso do usuário
  const userAccessLevel = getUserAccessLevel(user);

  return {
    hasAccess,
    user,
    isLoggedIn,
    userAccessLevel,
    requiredLevel,
  };
}

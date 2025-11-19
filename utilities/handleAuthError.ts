/**
 * Mensagens de erro de autenticação em português
 */
export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou senha incorretos. Por favor, tente novamente.',
  USER_NOT_FOUND: 'Usuário não encontrado. Verifique seu email.',
  EMAIL_ALREADY_EXISTS: 'Este email já está cadastrado. Tente fazer login.',
  WEAK_PASSWORD: 'A senha deve ter pelo menos 8 caracteres.',
  INVALID_EMAIL: 'Por favor, insira um email válido.',
  SESSION_EXPIRED: 'Sua sessão expirou. Por favor, faça login novamente.',
  UNAUTHORIZED: 'Você não tem permissão para acessar este conteúdo.',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet e tente novamente.',
  UNKNOWN_ERROR: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
  VERIFICATION_REQUIRED: 'Verifique seu email antes de continuar.',
  ACCOUNT_LOCKED: 'Sua conta foi bloqueada. Entre em contato com o suporte.',
  TOO_MANY_REQUESTS: 'Muitas tentativas. Por favor, aguarde alguns minutos.',
} as const;

export type AuthErrorType = keyof typeof AUTH_ERROR_MESSAGES;

/**
 * Mapeia erros comuns da API para mensagens amigáveis
 */
export function getAuthErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Mapeia mensagens comuns de erro
    if (
      message.includes('invalid credentials') ||
      message.includes('incorrect')
    ) {
      return AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS;
    }
    if (message.includes('not found') || message.includes('no user')) {
      return AUTH_ERROR_MESSAGES.USER_NOT_FOUND;
    }
    if (message.includes('already exists') || message.includes('duplicate')) {
      return AUTH_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS;
    }
    if (message.includes('password') && message.includes('weak')) {
      return AUTH_ERROR_MESSAGES.WEAK_PASSWORD;
    }
    if (message.includes('invalid email')) {
      return AUTH_ERROR_MESSAGES.INVALID_EMAIL;
    }
    if (message.includes('expired') || message.includes('token')) {
      return AUTH_ERROR_MESSAGES.SESSION_EXPIRED;
    }
    if (message.includes('unauthorized') || message.includes('forbidden')) {
      return AUTH_ERROR_MESSAGES.UNAUTHORIZED;
    }
    if (message.includes('network') || message.includes('fetch')) {
      return AUTH_ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (message.includes('verify') || message.includes('verification')) {
      return AUTH_ERROR_MESSAGES.VERIFICATION_REQUIRED;
    }
    if (message.includes('locked') || message.includes('blocked')) {
      return AUTH_ERROR_MESSAGES.ACCOUNT_LOCKED;
    }
    if (message.includes('too many') || message.includes('rate limit')) {
      return AUTH_ERROR_MESSAGES.TOO_MANY_REQUESTS;
    }

    // Retorna a mensagem original se não houver match
    return error.message;
  }

  return AUTH_ERROR_MESSAGES.UNKNOWN_ERROR;
}

/**
 * Loga erro de autenticação de forma estruturada
 */
export function logAuthError(context: string, error: unknown): void {
  console.error(`[Auth Error - ${context}]:`, {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Trata erro de autenticação e retorna mensagem apropriada
 * Também loga o erro para debugging
 */
export function handleAuthError(context: string, error: unknown): string {
  logAuthError(context, error);
  return getAuthErrorMessage(error);
}

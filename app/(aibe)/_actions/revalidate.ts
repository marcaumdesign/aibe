'use server'

import { revalidatePath } from 'next/cache'

/**
 * Server action para revalidar o cache após login/logout
 * Isso força a atualização do header e outros componentes server
 */
export async function revalidateHeader() {
  revalidatePath('/', 'layout')
}


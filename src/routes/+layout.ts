import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  return {
    path: url.pathname
  };
};

export const handleError = async ({ error, status, message }) => {
  console.error('Layout error:', { error, status, message });
  return {
    message: 'Une erreur est survenue',
    details: error instanceof Error ? error.message : String(error)
  };
};
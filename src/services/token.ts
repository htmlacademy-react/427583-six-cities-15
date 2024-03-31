const AUTH_TOKEN_KEY = 'six-cities-token';

export type Token = string;

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY) ?? '';

export const saveToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_KEY, token);

export const removeToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

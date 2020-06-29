export function saveToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token))
}

export function getToken(): string | null {
    return JSON.parse(localStorage.getItem('token') as string) || null
}

export function clearToken(): void {
    localStorage.removeItem('token');
}
export function saveToken(token: string): void {
    localStorage.setItem('userData', JSON.stringify({token}))
}

export function getToken(): string | null {
    return JSON.parse(localStorage.getItem('userData') as string) || null
}

export function clearToken(): void {
    localStorage.removeItem('userData');
}
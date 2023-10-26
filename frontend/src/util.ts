export function arraySetN<T>(array: T[], n: number, elem: T): T[] {
    if (array.length < n || n < 0) {
        return array
    }
    return [...array.slice(0, n), elem, ...array.slice(n+1)]
}

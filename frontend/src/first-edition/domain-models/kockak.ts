
export function dAny(sides: number) {
    return Math.floor(Math.random() * sides) + 1;
}

export function d6() {
    return dAny(6)
}

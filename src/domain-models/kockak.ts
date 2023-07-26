
export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max) + 1;
}

export function d6() {
    return getRandomInt(6)
}

export function SignedNumberToText(val: number) : string {
    return val > 0 ? '+'+val : val.toString()
}

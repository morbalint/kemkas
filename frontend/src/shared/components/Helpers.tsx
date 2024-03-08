export function SignedNumberToText(val?: number) : string {
    return (val === null || val === undefined) ? "" : (val === 0 ? " 0" : (val > 0 ? '+'+val : val.toString()))
}

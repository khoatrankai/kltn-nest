export function sortObject(obj: any): any {
    const sorted: any = {};
    const keys: string[] = Object.keys(obj).sort();

    for (const key of keys) {
        sorted[encodeURIComponent(key)] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    }

    return sorted;
}

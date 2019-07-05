export function sortDatesDescending(left: Date, right: Date): number {
    if (left > right) {
        return -1;
    }

    if (left < right) {
        return 1;
    }

    return 0;
}

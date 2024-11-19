export function findMostFrequentString(strings: string[]): string | null {
    if (strings.length === 0) return null;

    const frequencyMap: Record<string, number> = {};

    // Count the occurrences of each string
    for (const str of strings) {
        frequencyMap[str] = (frequencyMap[str] || 0) + 1;
    }

    // Find the string with the highest frequency
    let mostFrequent = strings[0];
    let maxCount = frequencyMap[mostFrequent];

    for (const str in frequencyMap) {
        if (frequencyMap[str] > maxCount) {
            mostFrequent = str;
            maxCount = frequencyMap[str];
        }
    }

    return mostFrequent;
}

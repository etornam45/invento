import Sale from "model/db/sales";

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


export function timeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30;
    const years = months / 12;

    if (seconds < 60) {
        return 'Just now';
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} min ago`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} hrs ago`;
    } else if (days < 7) {
        return `${Math.floor(days)} days ago`;
    } else if (weeks < 4) {
        return `${Math.floor(weeks)} wks ago`;
    } else if (months < 12) {
        return `${Math.floor(months)} months ago`;
    } else {
        return `${Math.floor(years)} yrs ago`;
    }
}

export const timePassed = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) {
        return 'Today';
    } else if (date >= yesterday) {
        return 'Yesterday';
    } else {
        return new Date(date).toDateString();
    }
}


export const groupSaleByDay = (items: Sale[]): Record<string, Sale[]> => {
    return items.reduce((groups, item) => {
        const date = new Date(item.createdAt).toISOString().split("T")[0]; // Extract the date part
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(item);
        return groups;
    }, {} as Record<string, Sale[]>);
};

/**
 *  Core
 */
export declare const daysMap: string[];
export declare const monthMap: string[];
export declare const getDayDetails: (args: any) => {
    date: number;
    day: number;
    month: number;
    timestamp: number;
    dayString: string;
};
export declare const getNumberOfDays: (year: number, month: number) => number;
export declare const getMonthDetails: (year: number, month: number) => {
    date: number;
    day: number;
    month: number;
    timestamp: number;
    dayString: string;
}[];
export declare const getDateFromDateString: (dateValue: string) => {
    year: number;
    month: number;
    date: number;
} | null;
export declare const getMonthStr: (month: number) => string;

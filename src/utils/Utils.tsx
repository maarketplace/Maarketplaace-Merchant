
export const formatNumber = (number: number | undefined): string => {
    if (number === undefined || number === null) {
        return '0'; // or handle this case as needed
    }
    return number.toLocaleString('en-US');
};
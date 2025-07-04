/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Image } from "lucide-react";

interface TableProps<T> {
    columns: Array<{
        key: keyof T;
        label: string;
        sortable?: boolean;
        type?: 'text' | 'image' | 'number' | 'date';
        width?: string;
        render?: (value: any, row: T) => React.ReactNode;
        mobileHidden?: boolean;
        priority?: number;
    }>;
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    rowsPerPage?: number;
    onRowClick?: (row: T) => void;
    className?: string;
    searchPlaceholder?: string;
    showSearch?: boolean;
    striped?: boolean;
    mobileBreakpoint?: 'sm' | 'md' | 'lg';
}

type SortDirection = 'asc' | 'desc' | null;

const Table = <T extends Record<string, any>>({
    columns,
    data,
    loading = false,
    emptyMessage = "No data available",
    rowsPerPage = 10,
    onRowClick,
    className = "",
    searchPlaceholder = "Search...",
    showSearch = true,
    striped = true,
    mobileBreakpoint = 'md',
}: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (columnKey: keyof T) => {
        const column = columns.find(col => col.key === columnKey);
        if (!column?.sortable) return;

        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
        setCurrentPage(1);
    };

    const processedData = useMemo(() => {
        let filtered = data;

        if (searchQuery) {
            filtered = data.filter(row =>
                columns.some(column => {
                    const value = row[column.key];
                    return String(value).toLowerCase().includes(searchQuery.toLowerCase());
                })
            );
        }

        if (sortColumn && sortDirection) {
            filtered = [...filtered].sort((a, b) => {
                const aValue = a[sortColumn];
                const bValue = b[sortColumn];

                if (aValue === bValue) return 0;

                const comparison = aValue > bValue ? 1 : -1;
                return sortDirection === 'asc' ? comparison : -comparison;
            });
        }

        return filtered;
    }, [data, searchQuery, sortColumn, sortDirection, columns]);

    const totalPages = Math.ceil(processedData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, processedData.length);
    const currentData = processedData.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderCell = (column: typeof columns[0], row: T) => {
        const value = row[column.key];

        if (column.render) {
            return column.render(value, row);
        }

        switch (column.type) {
            case 'image':
                return (
                    <div className="flex items-center justify-center max-[650px]:justify-end">
                        {value ? (
                            <img
                                src={String(value)}
                                alt="Table image"
                                className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg border border-gray-200"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : null}
                        <div className={`flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-gray-100 rounded-lg border border-gray-200 ${value ? 'hidden' : ''}`}>
                            <Image size={12} className="text-gray-400 sm:w-4 sm:h-4" />
                        </div>
                    </div>
                );
            case 'number':
                return <span className="font-mono text-sm sm:text-base">{value?.toLocaleString()}</span>;
            case 'date':
                return <span className="text-sm sm:text-base">{value ? new Date(value).toLocaleDateString() : '-'}</span>;
            default: {
                const text = String(value || '');
                return (
                    <span className="truncate text-sm sm:text-base" title={text.length > 30 ? text : undefined}>
                        {text.length > 30 ? `${text.slice(0, 30)}...` : text}
                    </span>
                );
            }
        }
    };

    const renderMobileCard = (row: T, index: number) => {
        // Show all columns instead of filtering out mobileHidden ones
        const allColumns = columns; // Use all columns instead of mobileColumns

        return (
            <div
                key={index}
                className={`
                    border border-gray-200 dark:border-gray-700 rounded-lg mb-3 last:mb-0 overflow-hidden w-full
                    ${striped && index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-black/50'}
                `}
            >
                <div
                    className={`
                        p-2
                        ${onRowClick ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 active:bg-blue-100 dark:active:bg-blue-900/30 transition-colors duration-150 w-full' : ''}
                    `}
                    onClick={() => {
                        if (onRowClick) {
                            onRowClick(row);
                        }
                    }}
                >
                    <div className="space-y-4 p-2">
                        {allColumns.map((column) => (
                            <div key={String(column.key)} className="flex justify-between items-start">
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-3 flex-shrink-0">
                                    {column.label}
                                </span>
                                <div className="text-right flex-1">
                                    {renderCell(column, row)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderLoadingSkeleton = () => (
        <>
            <tbody className={`${mobileBreakpoint === 'sm' ? 'hidden sm:table-row-group' : mobileBreakpoint === 'md' ? 'hidden md:table-row-group' : 'hidden lg:table-row-group'}`}>
                {Array.from({ length: rowsPerPage }).map((_, index) => (
                    <tr key={index} className={striped && index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : ""}>
                        {columns.map((_, colIndex) => (
                            <td key={colIndex} className="px-4 py-3 border-b border-gray-200">
                                <div className="animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>

            <div className={`${mobileBreakpoint === 'sm' ? 'sm:hidden' : mobileBreakpoint === 'md' ? 'md:hidden' : 'lg:hidden'} p-4 space-y-3`}>
                {Array.from({ length: Math.min(rowsPerPage, 5) }).map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="animate-pulse space-y-3">
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const getSortIcon = (columnKey: keyof T) => {
        if (sortColumn !== columnKey) {
            return <span className="text-gray-400 ml-1 text-xs sm:text-sm">↕</span>;
        }
        if (sortDirection === 'asc') {
            return <span className="text-blue-600 ml-1 text-xs sm:text-sm">↑</span>;
        }
        if (sortDirection === 'desc') {
            return <span className="text-blue-600 ml-1 text-xs sm:text-sm">↓</span>;
        }
        return <span className="text-gray-400 ml-1 text-xs sm:text-sm">↕</span>;
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = window.innerWidth < 640 ? 3 : 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 1) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage, '...', totalPages);
            }
        }

        return pages;
    };

    const breakpointClass = mobileBreakpoint === 'sm' ? 'sm' : mobileBreakpoint === 'md' ? 'md' : 'lg';

    return (
        <div className={`bg-white dark:bg-black rounded-lg shadow-sm border border-gray-300 dark:border-gray-700 ${className}`}>
            {showSearch && (
                <div className="p-3 sm:p-4 border-b border-gray-300 dark:border-gray-700">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            disabled={loading}
                            className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg outline-none transition-all duration-200 dark:bg-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            )}

            {/* Desktop Table View */}
            <div className={`${breakpointClass === 'sm' ? 'hidden sm:block' : breakpointClass === 'md' ? 'hidden md:block' : 'hidden lg:block'} overflow-x-auto`}>
                <table className="min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={String(column.key)}
                                    className={`px-4 py-3 text-left text-xs font-semibold text-black dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none' : ''
                                        }`}
                                    style={{ width: column.width }}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center">
                                        {column.label}
                                        {column.sortable && getSortIcon(column.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {loading ? (
                        renderLoadingSkeleton()
                    ) : currentData.length > 0 ? (
                        <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-700">
                            {currentData?.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`
                                        ${onRowClick ? 'cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150' : ''}
                                        ${striped && rowIndex % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-black/50'}
                                    `}
                                    onClick={() => onRowClick?.(row)}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={String(column.key)}
                                            className="px-4 py-3 text-sm text-black dark:text-white"
                                        >
                                            {renderCell(column, row)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                                            <Search size={20} className="text-gray-400" />
                                        </div>
                                        {emptyMessage}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

            {/* Mobile Card View */}
            <div className={`${breakpointClass === 'sm' ? 'sm:hidden' : breakpointClass === 'md' ? 'md:hidden' : 'lg:hidden'}`}>
                {loading ? (
                    <div className="p-2">
                        {Array.from({ length: Math.min(rowsPerPage, 5) }).map((_, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="animate-pulse space-y-3">
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : currentData.length > 0 ? (
                    <div className="p-4">
                        {currentData?.map((row, index) => renderMobileCard(row, index))}
                    </div>
                ) : (
                    <div className="p-2 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-3">
                                <Search size={20} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500">{emptyMessage}</p>
                        </div>
                    </div>
                )}
            </div>

            {!loading && processedData.length > 0 && (
                <div className="px-3 sm:px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700 dark:text-gray-300 self-center">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>

                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-black dark:text-white">
                                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                    <span className="font-medium">{endIndex}</span> of{' '}
                                    <span className="font-medium">{processedData.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    {getPageNumbers().map((page, index) => (
                                        page === '...' ? (
                                            <span key={index} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-300">
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                key={index}
                                                onClick={() => handlePageChange(page as number)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                                    ? 'z-10 bg-blue-50 dark:bg-blue-900/50 border-blue-500 text-blue-600 dark:text-blue-400'
                                                    : 'bg-white dark:bg-black border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;

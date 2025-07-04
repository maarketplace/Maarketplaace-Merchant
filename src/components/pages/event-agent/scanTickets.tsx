/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent, useCallback } from 'react';
import {
    TbQrcode,
    TbKeyboard,
    TbCheck,
    TbSearch
} from 'react-icons/tb';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Html5QrcodeScanner } from "html5-qrcode";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
}


type TabType = 'qr' | 'manual';

const ScanTickets: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('qr');
    const [manualCode, setManualCode] = useState<string>('');
    const [cameraError, setCameraError] = useState<string>('');

    const qrScannerRef = useRef<any>(null);

    const stats ={
        totalScanned: 45,
        validTickets: 42,
        invalidTickets: 3,
        lastScanTime: new Date().toLocaleTimeString()
    };

 
    const success = useCallback((qrData: string): void => {
        console.log("QR Code scanned:", qrData);
    },[]);

    const error = useCallback((err: any): void => {
        console.warn("QR Scanner error:", err);
    }, []);


    const startQRScanner = useCallback(async (): Promise<void> => {
        try {
            // Don't start if already running
            // if (qrScannerRef.current) {
            //     return;
            // }

            const scanner = new Html5QrcodeScanner("reader", {
                qrbox: { width: 250, height: 250 },
                fps: 10,
            }, false);

            qrScannerRef.current = scanner;
            scanner.render(success, error);
        } catch (err) {
            console.error("Error starting scanner", err);
            setCameraError("Failed to start the QR scanner.");
        }
    }, [success, error]);

    const stopQRScanner = async (): Promise<void> => {
        if (qrScannerRef.current) {
            try {
                await qrScannerRef.current.html5Qrcode.stop();
                qrScannerRef.current.clear();
                qrScannerRef.current = null;
                
                const readerElement = document.getElementById('reader');
                if (readerElement) {
                    readerElement.innerHTML = '';
                }
            } catch (err) {
                console.error("Error stopping scanner", err);
            }
        }
    };



    const handleManualEntry = (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>): void => {
        if (e) e.preventDefault();
        if (manualCode.trim()) {
            setManualCode('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleManualEntry(e);
        }
    };

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab);
        setCameraError('');

        if (tab === 'qr') {
            setTimeout(() => startQRScanner(), 100);
        } else if (tab === 'manual') {
            stopQRScanner();
        }
    };

    // Auto-start QR scanner on component mount
    useEffect(() => {
        let mounted = true;

        if (activeTab === 'qr' && mounted) {
            const timer = setTimeout(() => {
                if (mounted) {
                    startQRScanner();
                }
            }, 100);

            return () => {
                clearTimeout(timer);
                mounted = false;
            };
        }

        return () => {
            mounted = false;
            stopQRScanner();
        };
    }, [activeTab, startQRScanner]);

    const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = "text-blue-600" }) => (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
                <div className={`${color} opacity-80`}>
                    {icon}
                </div>
            </div>
        </div>

    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Ticket Scanner
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Scan QR codes or enter ticket codes manually to validate attendees
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Scanned"
                        value={stats.totalScanned}
                        icon={<TbQrcode className="w-6 h-6" />}
                        color="text-blue-600"
                    />
                    <StatCard
                        title="Valid Tickets"
                        value={stats.validTickets}
                        icon={<CheckCircle className="w-6 h-6" />}
                        color="text-green-600"
                    />
                    <StatCard
                        title="Invalid Tickets"
                        value={stats.invalidTickets}
                        icon={<XCircle className="w-6 h-6" />}
                        color="text-red-600"
                    />
                    <StatCard
                        title="Last Scan"
                        value={stats.lastScanTime}
                        icon={<Clock className="w-6 h-6" />}
                        color="text-purple-600"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => handleTabChange('qr')}
                            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'qr'
                                ? 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <TbQrcode className="w-5 h-5" />
                                QR Scanner
                            </div>
                        </button>
                        <button
                            onClick={() => handleTabChange('manual')}
                            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'manual'
                                ? 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <TbKeyboard className="w-5 h-5" />
                                Manual Entry
                            </div>
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'qr' ? (
                            <div className="space-y-4 flex items-center justify-center flex-col ">
                                {/* <div className="relative bg-gray-100 h-auto dark:bg-gray-700 rounded-lg w-full max-w-md" style={{ aspectRatio: '1' }}> */}
                                    <div id="reader" className="w-full  rounded-lg"></div>
                                {/* </div> */}

                                {cameraError && (
                                    <div className="text-center">
                                        <p className="text-red-600 text-sm mb-4">{cameraError}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="ticketCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Ticket Code
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="ticketCode"
                                                value={manualCode}
                                                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                                                onKeyPress={handleKeyPress}
                                                placeholder="Enter ticket code (e.g., TKT-ABC123)"
                                                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg font-mono"
                                                autoComplete="off"
                                            />
                                            <TbSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!manualCode.trim()}
                                        onClick={() => handleManualEntry()}
                                        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                    >
                                        <TbCheck className="w-5 h-5" />
                                        Validate Ticket
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Enter the ticket code manually if QR scanning is not available
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default ScanTickets;

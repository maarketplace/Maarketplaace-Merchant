/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import {
    TbQrcode,
    TbKeyboard,
    TbCheck,
    TbCamera,
    TbCameraOff,
    TbSearch
} from 'react-icons/tb';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import QrScanner from 'qr-scanner';

interface AttendeeData {
    ticketCode: string;
    attendeeName: string;
    eventName: string;
    ticketType: 'VIP' | 'Regular' | 'Student';
    scanTime: string;
    scanMethod: 'qr' | 'manual';
    isValid: boolean;
    alreadyScanned: boolean;
}

interface Stats {
    totalScanned: number;
    validTickets: number;
    invalidTickets: number;
    lastScanTime: string;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
}

interface ScanResultCardProps {
    result: AttendeeData;
}

type TabType = 'qr' | 'manual';
type ScanMethod = 'qr' | 'manual';

const ScanTickets: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('qr');
    const [manualCode, setManualCode] = useState<string>('');
    const [scanResult, setScanResult] = useState<AttendeeData | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [scanHistory, setScanHistory] = useState<AttendeeData[]>([]);
    const [cameraError, setCameraError] = useState<string>('');

    const videoRef = useRef<HTMLVideoElement>(null);
    const qrScannerRef = useRef<any>(null);

    const [stats, setStats] = useState<Stats>({
        totalScanned: 45,
        validTickets: 42,
        invalidTickets: 3,
        lastScanTime: new Date().toLocaleTimeString()
    });

    const startQRScanner = async (): Promise<void> => {
        try {
            setCameraError('');

            qrScannerRef.current = new QrScanner(
                videoRef.current!,
                (result: { data: string; }) => handleQRResult(result.data),
                {
                    onDecodeError: (error: any) => console.log('QR decode error:', error),
                    preferredCamera: 'environment', // Use back camera
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                    maxScansPerSecond: 5,
                }
            );

            await qrScannerRef.current.start();
            setIsScanning(true);

        } catch (error) {
            setCameraError('Unable to access camera or start QR scanner.');
            console.error('QR Scanner error:', error);
        }
      };

    // Stop QR scanner
    const stopQRScanner = (): void => {
        if (qrScannerRef.current) {
            // qrScannerRef.current.stop();
            // qrScannerRef.current.destroy();
            qrScannerRef.current = null;
        }

        // Stop camera stream
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }

        setIsScanning(false);
    };

    // Handle QR scan result
    const handleQRResult = (qrData: string): void => {
        if (qrData && qrData.trim()) {
            handleTicketValidation(qrData.trim(), 'qr');
        }
    };

    // Simulate QR code detection for demo
    const simulateQRScan = (): void => {
        const mockTicketCode = `TKT-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
        handleQRResult(mockTicketCode);
    };

    // Handle manual code entry
    const handleManualEntry = (e?: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>): void => {
        if (e) e.preventDefault();
        if (manualCode.trim()) {
            handleTicketValidation(manualCode.trim(), 'manual');
            setManualCode('');
        }
    };

    // Validate ticket (mock validation)
    const handleTicketValidation = (code: string, method: ScanMethod): void => {
        // Mock validation logic
        const isValid = Math.random() > 0.2; // 80% chance of valid ticket
        const ticketTypes: AttendeeData['ticketType'][] = ['VIP', 'Regular', 'Student'];

        const attendeeData: AttendeeData = {
            ticketCode: code,
            attendeeName: `John Doe ${Math.floor(Math.random() * 100)}`,
            eventName: 'Tech Conference 2024',
            ticketType: ticketTypes[Math.floor(Math.random() * ticketTypes.length)],
            scanTime: new Date().toLocaleTimeString(),
            scanMethod: method,
            isValid: isValid,
            alreadyScanned: !isValid && Math.random() > 0.5
        };

        setScanResult(attendeeData);

        // Update stats
        setStats(prev => ({
            ...prev,
            totalScanned: prev.totalScanned + 1,
            validTickets: prev.validTickets + (isValid ? 1 : 0),
            invalidTickets: prev.invalidTickets + (isValid ? 0 : 1),
            lastScanTime: attendeeData.scanTime
        }));

        // Add to scan history
        setScanHistory(prev => [attendeeData, ...prev.slice(0, 9)]); // Keep last 10 scans

        // Clear result after 5 seconds
        setTimeout(() => setScanResult(null), 5000);
    };

    // Handle keyboard events for manual entry
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleManualEntry(e);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopQRScanner();
        };
    }, []);

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

    const ScanResultCard: React.FC<ScanResultCardProps> = ({ result }) => (
        <div className={`p-4 rounded-lg border-2 animate-in slide-in-from-top duration-300 ${result.isValid
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
            }`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    {result.isValid ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className={`font-semibold ${result.isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                        }`}>
                        {result.isValid ? 'Valid Ticket' : (result.alreadyScanned ? 'Already Scanned' : 'Invalid Ticket')}
                    </span>
                </div>
                <span className="text-sm text-gray-500">{result.scanTime}</span>
            </div>

            <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {result.attendeeName}</div>
                <div><strong>Ticket:</strong> {result.ticketCode}</div>
                <div><strong>Type:</strong> {result.ticketType}</div>
                <div><strong>Event:</strong> {result.eventName}</div>
                <div><strong>Method:</strong> {result.scanMethod === 'qr' ? 'QR Scan' : 'Manual Entry'}</div>
            </div>
        </div>
    );

    const handleTabChange = (tab: TabType): void => {
        setActiveTab(tab);
        if (tab === 'qr' && !isScanning) {
            // Auto-start scanner when switching to QR tab
            setTimeout(() => startQRScanner(), 100);
        } else if (tab === 'manual') {
            stopQRScanner();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Ticket Scanner
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Scan QR codes or enter ticket codes manually to validate attendees
                    </p>
                </div>

                {/* Stats Cards */}
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

                {/* Scan Result */}
                {scanResult && (
                    <ScanResultCard result={scanResult} />
                )}

                {/* Tab Navigation */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex border-b border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => handleTabChange('qr')}
                            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === 'qr'
                                    ? 'text-[#FFC300] border-b-2 border-[#FFC300] bg-yellow-50 dark:bg-yellow-900/20'
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
                                    ? 'text-[#FFC300] border-b-2 border-[#FFC300] bg-yellow-50 dark:bg-yellow-900/20'
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
                            <div className="space-y-4">
                                <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                                    {isScanning ? (
                                        <>
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-48 h-48 border-2 border-[#FFC300] rounded-lg relative">
                                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#FFC300] rounded-tl-lg"></div>
                                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#FFC300] rounded-tr-lg"></div>
                                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#FFC300] rounded-bl-lg"></div>
                                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#FFC300] rounded-br-lg"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-[#FFC300] text-sm font-medium bg-black/50 px-2 py-1 rounded">
                                                            Scanning...
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <div className="text-center">
                                                <TbCameraOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                    QR Scanner is not active
                                                </p>
                                                {cameraError && (
                                                    <p className="text-red-600 text-sm mb-4">{cameraError}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-3 justify-center">
                                    {!isScanning ? (
                                        <button
                                            onClick={startQRScanner}
                                            className="bg-[#FFC300] hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                                        >
                                            <TbCamera className="w-5 h-5" />
                                            Start QR Scanner
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={stopQRScanner}
                                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <TbCameraOff className="w-5 h-5" />
                                                Stop Scanner
                                            </button>
                                            <button
                                                onClick={simulateQRScan}
                                                className="bg-[#FFC300] hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <TbQrcode className="w-5 h-5" />
                                                Simulate Scan
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <p>Position the QR code within the frame to scan automatically</p>
                                    <p className="text-xs">Using QR code library for enhanced detection</p>
                                </div>
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
                                                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC300] focus:border-transparent dark:bg-gray-700 dark:text-white text-lg font-mono"
                                                autoComplete="off"
                                            />
                                            <TbSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!manualCode.trim()}
                                        className="w-full bg-[#FFC300] hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
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

                {scanHistory.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Recent Scans ({scanHistory.length})
                            </h3>
                        </div>
                        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                            {scanHistory.map((scan, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        {scan.isValid ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{scan.attendeeName}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{scan.ticketCode}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{scan.scanTime}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            {scan.scanMethod === 'qr' ? (
                                                <>
                                                    <TbQrcode className="w-3 h-3" />
                                                    QR
                                                </>
                                            ) : (
                                                <>
                                                    <TbKeyboard className="w-3 h-3" />
                                                    Manual
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScanTickets;

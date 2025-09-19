"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import jsQR from 'jsqr'; // Import jsQR
// import { useRouter } from 'next/navigation';
import { jsPDF } from "jspdf"; // Import jsPDF
import html2canvas from 'html2canvas'; // Import html2canvas

// Placeholder data for demonstration - same as in app/animalProfile/[animalId]/page.tsx
const animalsData: AnimalData[] = [
  {
    id: 'CT001',
    name: 'Dairy Cow #1',
    type: 'Cattle',
    safeForMeat: true,
    safeForMilk: true,
    complianceScore: 95,
    complianceScoreNormalized: 1, // 1 = Safe
    certifications: ['Organic Certified', 'AMU Compliant'],
    breed: 'Holstein Friesian',
    age: '3 years',
    weight: '450 kg',
    lastTreatment: '2024-01-22',
    nextCheckup: '2024-07-15',
    lastCheckup: '2024-01-15',
    status: 'safe',
    farmerName: 'Rajesh Kumar',
    registrationDate: '2024-01-20',
    farmLocation: 'Village Kothur, Telangana',
    
  },
  {
    id: 'CT002',
    name: 'Dairy Cow #2',
    type: 'Cattle',
    safeForMeat: false,
    safeForMilk: true,
    complianceScore: 70,
    complianceScoreNormalized: 0.5, // 0.5 = Risk
    certifications: ['MRL Safe'],
    breed: 'Jersey',
    age: '2 years',
    weight: '380 kg',
    lastTreatment: '2024-02-10',
    nextCheckup: '2024-08-20',
    lastCheckup: '2024-02-05',
    status: 'warning',
    farmerName: 'Priya Sharma',
    registrationDate: '2023-11-01',
    farmLocation: 'Town A, State B',
    
  },
];

interface AnimalData {
  id: string;
  name: string;
  type: string;
  safeForMeat?: boolean;
  safeForMilk?: boolean;
  complianceScore?: number;
  complianceScoreNormalized?: number;
  certifications?: string[];
  breed: string;
  age: string;
  weight: string;
  lastTreatment: string;
  nextCheckup: string;
  lastCheckup: string;
  status: "safe" | "warning" | "not-safe";
  farmerName?: string;
  registrationDate?: string;
  farmLocation?: string;

}

export default function ScanQRStartPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [fullAnimalDetails, setFullAnimalDetails] = useState<AnimalData | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [cameraError, setCameraError] = useState<boolean>(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState<boolean>(true); // New state for popup
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fullAnimalDetailsDivRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  // const router = useRouter(); // Router is not used in this component

  const handleScan = useCallback((data: string | null) => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.type === 'animal' && parsedData.id) {
          const animal = animalsData.find((a) => a.id === parsedData.id);
          if (animal) {
            setFullAnimalDetails(animal);
            setScanResult(animal.name); // Display only the animal's name
            setIsScanning(false);
            // Do not redirect immediately, wait for PDF generation or explicit action
          } else {
            setScanResult(`Animal ID ${parsedData.id} not found.`);
            setFullAnimalDetails(null); // Clear previous details
            setIsScanning(false);
          }
        } else {
          setScanResult(data); // Not an animal QR, show raw data
          setFullAnimalDetails(null); // Clear previous details
          setIsScanning(false);
        }
      } catch (e) {
        console.error("Error parsing QR data:", e);
        setScanResult(data); // Not JSON, show raw data
        setFullAnimalDetails(null); // Clear previous details
        setIsScanning(false);
      }
    }
  }, [setFullAnimalDetails, setScanResult, setIsScanning]);

  const stopCamera = useCallback(() => {
    console.log("Attempting to stop camera.");
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        console.log("Stopping camera track:", track);
        track.stop();
      });
      videoRef.current.srcObject = null; // Explicitly nullify the srcObject
      console.log("Camera stream srcObject nullified.");
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      console.log("Animation frame cancelled.");
    }
    setIsScanning(false);
    console.log("setIsScanning set to false.");
  }, [setIsScanning, animationFrameId, videoRef]);

  const scanQRCode = useCallback(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current || videoRef.current.paused || videoRef.current.ended) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);

      if (imageData) {
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

        if (code) {
          handleScan(code.data);
          stopCamera();
          return;
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(scanQRCode);
  }, [isScanning, handleScan, stopCamera, videoRef, canvasRef, animationFrameId]);

  const startCamera = useCallback(async () => {
    setShowPermissionPopup(false); // Hide popup once scanning starts or permission is requested
    setCameraError(false);
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.setAttribute('muted', 'true');
        await videoRef.current.play();
        scanQRCode();
      }
    } catch (err: unknown) {
      console.error("Error accessing camera:", err);
      if (err instanceof Error) {
        console.error("Camera error name:", err.name);
        console.error("Camera error message:", err.message);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError' || err.name === 'NotFoundError' || err.name === 'NotReadableError') {
          setCameraError(true);
          setIsScanning(false);
        } else {
          setCameraError(true); // Generic error
          setIsScanning(false);
        }
      } else {
        setCameraError(true); // Generic error for non-Error objects
        setIsScanning(false);
      }
      setShowPermissionPopup(true); // Show popup again if there's a camera error
    }
  }, [scanQRCode, setCameraError, setIsScanning, setShowPermissionPopup, videoRef]);

  useEffect(() => {
    // Only attempt to start camera if not showing the popup initially
    if (!showPermissionPopup && isScanning) { 
      startCamera();
    } else if (!isScanning) {
      stopCamera();
    }
    return () => {
      console.log("useEffect cleanup: Attempting to stop camera.");
      stopCamera(); // Cleanup on unmount
    };
  }, [isScanning, showPermissionPopup, startCamera, stopCamera]);

  const handleDownloadPDF = async () => {
    if (fullAnimalDetails && fullAnimalDetailsDivRef.current) {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text("Ahaarsetu Livestock Report", doc.internal.pageSize.width / 2, 20, { align: "center" });

      // Add horizontal line
      doc.setDrawColor(200, 200, 200); // Light gray
      doc.line(20, 25, doc.internal.pageSize.width - 20, 25);

      // Convert hidden div to image and embed
      const canvas = await html2canvas(fullAnimalDetailsDivRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 180; // A4 width - 2 * margin
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
      const imgY = 30; // Start below the line
      doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);

      // Add current date & time at the bottom
      const now = new Date();
      const dateTimeString = `Generated on: ${now.toLocaleString()}`;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100); // Medium gray
      doc.text(dateTimeString, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 15, { align: "center" });

      doc.save("Ahaarsetu Livestock Report.pdf");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-500 to-green-300 flex flex-col items-center justify-center p-4">
      {showPermissionPopup ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-lg w-full transform hover:scale-105 transition-transform duration-300"
        >
          <div className="flex justify-center mb-8">
            <QrCode className="text-green-600 w-24 h-24 sm:w-32 sm:h-32" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Enable Camera Access</h2>
          <p className="text-gray-600 mb-6">Please allow camera access to start scanning QR codes.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startCamera}
            className="w-full text-xl font-bold py-4 px-6 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg hover:from-green-700 hover:to-blue-700 transition duration-300"
          >
            Allow Camera
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-white mb-10 drop-shadow-lg"
          >
            QR Code Scanner
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-green-100 rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-lg w-full transform hover:scale-105 transition-transform duration-300"
          >
            {isScanning && !cameraError ? (
              <div className="mt-4 text-lg text-green-900 w-full relative p-2 border-4 border-green-400 rounded-lg max-w-sm mx-auto">
                <video
                  ref={videoRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: isScanning ? 'block' : 'none',
                  }}
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <p className="text-center mt-4">Point your camera at a QR code within the box.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={stopCamera}
                  className="mt-4 inline-flex items-center rounded-lg bg-orange-900 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-950 transition duration-200"
                >
                  Stop Scanning
                </motion.button>
              </div>
            ) : cameraError ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 p-4 bg-green-100 rounded-lg border border-green-400 text-green-800"
              >
                <h3 className="text-lg font-semibold mb-2">Camera Access Denied</h3>
                <p>Please enable camera permissions in your browser settings to use the QR scanner.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCamera}
                  className="mt-4 w-full text-xl font-bold py-4 px-6 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg hover:from-blue-700 hover:to-green-700 transition duration-300"
                >
                  Try Again
                </motion.button>
              </motion.div>
            ) : (scanResult ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-2">Scan Result:</h3>
                <p className="text-green-700 break-words">{scanResult}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setScanResult(null);
                    setFullAnimalDetails(null);
                    setIsScanning(true);
                  }}
                  className="mt-4 w-full text-xl font-bold py-4 px-6 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg hover:from-blue-700 hover:to-green-700 transition duration-300"
                >
                  Scan Again
                </motion.button>
                {/* Hidden div for html2canvas to capture full animal details */}
                <div ref={fullAnimalDetailsDivRef} className="absolute -left-[9999px] -top-[9999px] w-[210mm] p-8 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg text-left">
                  {fullAnimalDetails && (
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-green-800">Animal Details - {fullAnimalDetails.name} (ID: {fullAnimalDetails.id})</h2>
                      <p><strong>Type:</strong> {fullAnimalDetails.type}</p>  
                      <p><strong>Safe for Meat:</strong> {fullAnimalDetails.safeForMeat ? '✅ Yes' : '❌ No'}</p>
                      <p><strong>Safe for Milk:</strong> {fullAnimalDetails.safeForMilk ? '✅ Yes' : '❌ No'}</p>
                      <p><strong>Compliance Score:</strong> {fullAnimalDetails.complianceScore}%</p>
                      <p><strong>Certifications:</strong> {fullAnimalDetails.certifications?.join(', ') || 'None'}
                      <p><strong>Breed:</strong> {fullAnimalDetails.breed}</p>
                      <p><strong>Age:</strong> {fullAnimalDetails.age}</p>
                      <p><strong>Weight:</strong> {fullAnimalDetails.weight}</p>
                      <p><strong>Status:</strong> {fullAnimalDetails.status}</p>
                      <p><strong>Farmer:</strong> {fullAnimalDetails.farmerName}</p>
                      <p><strong>Registration Date:</strong> {fullAnimalDetails.registrationDate}</p>
                      <p><strong>Farm Location:</strong> {fullAnimalDetails.farmLocation}</p>
                      <p><strong>Last Checkup:</strong> {fullAnimalDetails.lastCheckup}</p>
                      <p><strong>Next Checkup:</strong> {fullAnimalDetails.nextCheckup}</p>
                   </p>
                      {/* Add more details as needed */}
                    </div>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadPDF}
                  className="mt-2 w-full text-xl font-bold py-4 px-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-300"
                >
                  Download PDF
                </motion.button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <QrCode className="text-green-600 w-24 h-24 sm:w-32 sm:h-32 mb-8" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan Finished</h2>
                <p className="text-gray-600 mb-6">No QR code detected or scanning stopped.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCamera}
                  className="w-full text-xl font-bold py-4 px-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:from-green-700 hover:to-emerald-700 transition duration-300"
                >
                  Start Scanning
                </motion.button>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-white text-sm opacity-80"
          >
            Scan the Animal QR Code to get your Product Quality Report.
          </motion.p>
        </>
      )}
    </div>
  );
}
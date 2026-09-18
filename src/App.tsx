import { useState, useCallback } from 'react';
import {
  Printer,
  Sparkles,
  RotateCcw,
  Eye,
  SlidersHorizontal,
  FileCheck,
  Info,
} from 'lucide-react';
import { ReceiptData, ReceiptItem, INITIAL_RECEIPT_DATA } from './types';
import { ReceiptSlip } from './components/ReceiptSlip';
import { FormControls } from './components/FormControls';
import { SignaturePad } from './components/SignaturePad';

export default function App() {
  const [data, setData] = useState<ReceiptData>(INITIAL_RECEIPT_DATA);
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [activeLayout, setActiveLayout] = useState<'split' | 'slip-only'>('split');
  const [showPrintBanner, setShowPrintBanner] = useState(true);

  // Update top-level receipt fields
  const handleDataChange = useCallback((updated: Partial<ReceiptData>) => {
    setData((prev) => {
      const next = { ...prev, ...updated };
      // If items changed or autoCalculate is on and total wasn't explicitly overridden:
      return next;
    });
  }, []);

  // Update a specific line item in the table
  const handleItemChange = useCallback((index: number, updatedItem: Partial<ReceiptItem>) => {
    setData((prev) => {
      const nextItems = [...prev.items];
      nextItems[index] = { ...nextItems[index], ...updatedItem };

      // Recompute total if autoCalculate is on
      let nextTotalRs = prev.totalRs;
      let nextTotalPaise = prev.totalPaise;

      if (prev.autoCalculate) {
        let totalAmount = 0;
        let hasAnyAmount = false;

        nextItems.forEach((item) => {
          const rs = parseFloat(item.amountRs);
          const p = item.amountPaise && item.amountPaise !== '-' ? parseFloat(item.amountPaise) / 100 : 0;
          if (!isNaN(rs)) {
            totalAmount += rs + (isNaN(p) ? 0 : p);
            hasAnyAmount = true;
          }
        });

        if (hasAnyAmount) {
          const floorTotal = Math.floor(totalAmount);
          const paise = Math.round((totalAmount - floorTotal) * 100);
          nextTotalRs = floorTotal.toString();
          nextTotalPaise = paise > 0 ? paise.toString().padStart(2, '0') : '-';
        }
      }

      return {
        ...prev,
        items: nextItems,
        totalRs: nextTotalRs,
        totalPaise: nextTotalPaise,
      };
    });
  }, []);

  // Add a new row to the receipt table
  const handleAddItem = useCallback(() => {
    setData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          particular: 'Other',
          marked: false,
          qnty: '',
          rate: '',
          amountRs: '',
          amountPaise: '',
        },
      ],
    }));
  }, []);

  // Remove a row from the receipt table
  const handleRemoveItem = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  // Reset to original photo sample
  const handleResetToSample = useCallback(() => {
    setData(INITIAL_RECEIPT_DATA);
  }, []);

  // Clear fillable amounts for a blank new receipt
  const handleClearFields = useCallback(() => {
    setData((prev) => ({
      ...prev,
      customerName: '',
      vehicleNo: '',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: '2-digit' }),
      items: prev.items.map((it) => ({
        ...it,
        marked: false,
        qnty: '',
        rate: '',
        amountRs: '',
        amountPaise: '',
      })),
      totalRs: '',
      totalPaise: '',
      signatureImage: null,
    }));
  }, []);

  // Primary Print Action: Triggers system print with exact slip styling
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100/80 text-neutral-900 flex flex-col">
      {/* 1. Header Toolbar (Hidden during printing) */}
      <header className="no-print bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ₹
            </div>
            <div>
              <h1 className="font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                Fuel Bill Cash Memo
              </h1>
              <p className="text-[11px] text-neutral-500 hidden sm:block">
                Exact replica printable receipt layout with interactive fields
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="hidden md:flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 text-xs">
              <button
                type="button"
                onClick={() => setActiveLayout('split')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  activeLayout === 'split'
                    ? 'bg-white text-neutral-900 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Editor & Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLayout('slip-only')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  activeLayout === 'slip-only'
                    ? 'bg-white text-neutral-900 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Slip Only</span>
              </button>
            </div>

            {/* Reset to Photo Sample */}
            <button
              type="button"
              onClick={handleResetToSample}
              className="flex items-center gap-1.5 text-xs text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Reset fields to match photo"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Photo Sample</span>
            </button>

            {/* Big Print Button */}
            <button
              type="button"
              id="print-receipt-main-btn"
              onClick={handlePrint}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Exact Memo</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Helpful Quick Banner (Hidden in print) */}
      {showPrintBanner && (
        <div className="no-print bg-blue-50/90 border-b border-blue-100 py-2 px-4 text-xs text-blue-900 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>
              <strong>Exact Printout Guarantee:</strong> Clicking <strong>Print Exact Memo</strong> prints ONLY the fuel cash memo with crisp ink lines, borders, and logos without toolbars or backgrounds.
            </span>
          </div>
          <button
            onClick={() => setShowPrintBanner(false)}
            className="text-blue-500 hover:text-blue-800 text-xs px-2 font-medium cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col">
        <div className={`grid gap-6 items-start ${
          activeLayout === 'split' ? 'lg:grid-cols-12' : 'grid-cols-1'
        }`}>
          {/* Left / Sidebar Editor Controls (Only shown in screen view & split layout) */}
          {activeLayout === 'split' && (
            <div className="no-print lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
              <FormControls
                data={data}
                onChange={handleDataChange}
                onItemChange={handleItemChange}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
                onResetToSample={handleResetToSample}
                onClearFields={handleClearFields}
                onOpenSignaturePad={() => setIsSignaturePadOpen(true)}
                onTriggerPrint={handlePrint}
              />
            </div>
          )}

          {/* Right: The Printable Receipt Slip Preview & Direct Editor */}
          <div className={`order-1 lg:order-2 flex flex-col items-center justify-center ${
            activeLayout === 'split' ? 'lg:col-span-6 xl:col-span-7' : 'col-span-1'
          }`}>
            {/* Direct Edit Helper Bar */}
            <div className="no-print mb-3 flex items-center justify-between w-full max-w-[430px] px-1 text-xs text-neutral-500">
              <span className="flex items-center gap-1.5 font-medium text-neutral-600">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Live Interactive Slip (Click to type)
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[11px] bg-neutral-200/70 text-neutral-700 px-2 py-0.5 rounded">
                  {data.inkColor === 'petrol-blue' ? 'Petrol Blue' : data.inkColor === 'deep-navy' ? 'Deep Navy' : 'Black'}
                </span>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                >
                  Print 🖨️
                </button>
              </div>
            </div>

            {/* The Actual Printable Slip Container */}
            <div className="receipt-page-wrapper w-full flex justify-center py-2 sm:py-4">
              <ReceiptSlip
                data={data}
                onChange={handleDataChange}
                onItemChange={handleItemChange}
                onOpenSignaturePad={() => setIsSignaturePadOpen(true)}
              />
            </div>

            {/* Quick print instructions for best results */}
            <div className="no-print mt-4 max-w-[430px] text-center text-xs text-neutral-400 space-y-1">
              <p>
                In the browser print dialog, ensure <strong>"Background graphics"</strong> is checked for exact logo and box rendering.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 4. Footer with Credits & Copyright (Hidden in print mode) */}
      <footer className="no-print mt-auto py-6 border-t border-neutral-200/80 bg-white/70 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>
            Designed &amp; Developed by <strong className="font-semibold text-neutral-800">Ricky Khatri</strong>
          </span>
          <span className="hidden sm:inline text-neutral-300">•</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>

      {/* 5. Signature Pad Modal (when drawing custom signature) */}
      {isSignaturePadOpen && (
        <SignaturePad
          onSave={(dataUrl) => {
            setData((prev) => ({
              ...prev,
              signatureImage: dataUrl,
              signatureMode: dataUrl ? 'drawn' : prev.signatureMode,
            }));
          }}
          onClose={() => setIsSignaturePadOpen(false)}
          inkColorHex={data.inkColor === 'carbon-black' ? '#1f242e' : '#1a3d94'}
        />
      )}
    </div>
  );
}

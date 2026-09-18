import React from 'react';
import {
  Printer,
  RotateCcw,
  Sparkles,
  PenTool,
  Calculator,
  Plus,
  Trash2,
  FileText,
  CheckCircle2,
  Fuel,
  Settings2,
} from 'lucide-react';
import { ReceiptData, ReceiptItem, INITIAL_RECEIPT_DATA } from '../types';

interface FormControlsProps {
  data: ReceiptData;
  onChange: (updated: Partial<ReceiptData>) => void;
  onItemChange: (index: number, updatedItem: Partial<ReceiptItem>) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onResetToSample: () => void;
  onClearFields: () => void;
  onOpenSignaturePad: () => void;
  onTriggerPrint: () => void;
}

export function FormControls({
  data,
  onChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onResetToSample,
  onClearFields,
  onOpenSignaturePad,
  onTriggerPrint,
}: FormControlsProps) {
  const [activeTab, setActiveTab] = React.useState<'bill' | 'station' | 'style'>('bill');

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-neutral-200/80 p-4 sm:p-5 flex flex-col h-full space-y-4">
      {/* Top Action Bar with Primary Print Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
            <Fuel className="w-5 h-5 text-blue-600" />
            Receipt Generator & Print
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Fill in fields below or edit directly on the receipt slip.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetToSample}
            title="Reset values to match the photo receipt"
            className="flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            onClick={onTriggerPrint}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-200 gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('bill')}
          className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'bill'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Bill Items & Customer</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('station')}
          className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'station'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Fuel className="w-3.5 h-3.5" />
          <span>Station & Dealer</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`pb-2 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'style'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-neutral-500 hover:text-neutral-800'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5" />
          <span>Ink & Pen Style</span>
        </button>
      </div>

      {/* Tab 1: Bill Items & Customer */}
      {activeTab === 'bill' && (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1 text-xs">
          {/* Customer & Memo Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-neutral-50/70 p-3 rounded-xl border border-neutral-200/70">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">M/s (Customer Name)</label>
              <input
                type="text"
                placeholder="e.g. M/s Sharma Logistics"
                value={data.customerName}
                onChange={(e) => onChange({ customerName: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">Vehicle No.</label>
              <input
                type="text"
                placeholder="e.g. MP 09 AB 1234"
                value={data.vehicleNo}
                onChange={(e) => onChange({ vehicleNo: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">Date</label>
                <input
                  type="text"
                  placeholder="1/7/26"
                  value={data.date}
                  onChange={(e) => onChange({ date: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs text-neutral-800 text-center font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">Memo No.</label>
                <input
                  type="text"
                  placeholder="343"
                  value={data.memoNo}
                  onChange={(e) => onChange({ memoNo: e.target.value })}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs text-neutral-800 text-center font-bold font-stamp focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Table Items Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-800">Fuel & Product Items</span>
                <label className="inline-flex items-center gap-1.5 text-[11px] text-neutral-600 bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.autoCalculate}
                    onChange={(e) => onChange({ autoCalculate: e.target.checked })}
                    className="rounded text-blue-600 w-3 h-3 cursor-pointer"
                  />
                  <span>Auto Calc (Qty × Rate)</span>
                </label>
              </div>

              <button
                type="button"
                onClick={onAddItem}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-medium cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            </div>

            {/* List of Fuel Items */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {data.items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex items-center gap-1.5 bg-neutral-50 p-1.5 rounded-lg border border-neutral-200"
                >
                  <input
                    type="checkbox"
                    checked={!!item.marked}
                    onChange={(e) => onItemChange(idx, { marked: e.target.checked })}
                    title="Mark row (e.g. check / dash)"
                    className="rounded text-blue-600 w-3.5 h-3.5 ml-1"
                  />

                  <input
                    type="text"
                    value={item.particular}
                    onChange={(e) => onItemChange(idx, { particular: e.target.value })}
                    className="w-24 font-medium text-xs bg-white border border-neutral-200 rounded px-1.5 py-1"
                    placeholder="Particular"
                  />

                  <div className="flex-1 grid grid-cols-4 gap-1">
                    <input
                      type="text"
                      value={item.qnty}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updated: Partial<ReceiptItem> = { qnty: val };
                        if (data.autoCalculate && item.rate) {
                          const q = parseFloat(val);
                          const r = parseFloat(item.rate.replace('/', '.'));
                          if (!isNaN(q) && !isNaN(r)) {
                            const tot = q * r;
                            const flr = Math.floor(tot);
                            const p = Math.round((tot - flr) * 100);
                            updated.amountRs = flr.toString();
                            updated.amountPaise = p > 0 ? p.toString().padStart(2, '0') : '-';
                          }
                        }
                        onItemChange(idx, updated);
                      }}
                      className="text-center text-xs bg-white border border-neutral-200 rounded px-1 py-1"
                      placeholder="Qnty"
                    />

                    <input
                      type="text"
                      value={item.rate}
                      onChange={(e) => {
                        const val = e.target.value;
                        const updated: Partial<ReceiptItem> = { rate: val };
                        if (data.autoCalculate && item.qnty) {
                          const q = parseFloat(item.qnty);
                          const r = parseFloat(val.replace('/', '.'));
                          if (!isNaN(q) && !isNaN(r)) {
                            const tot = q * r;
                            const flr = Math.floor(tot);
                            const p = Math.round((tot - flr) * 100);
                            updated.amountRs = flr.toString();
                            updated.amountPaise = p > 0 ? p.toString().padStart(2, '0') : '-';
                          }
                        }
                        onItemChange(idx, updated);
                      }}
                      className="text-center text-xs bg-white border border-neutral-200 rounded px-1 py-1"
                      placeholder="Rate"
                    />

                    <input
                      type="text"
                      value={item.amountRs}
                      onChange={(e) => onItemChange(idx, { amountRs: e.target.value })}
                      className="text-center font-bold text-xs bg-white border border-neutral-200 rounded px-1 py-1"
                      placeholder="Rs."
                    />

                    <input
                      type="text"
                      value={item.amountPaise}
                      onChange={(e) => onItemChange(idx, { amountPaise: e.target.value })}
                      className="text-center text-xs bg-white border border-neutral-200 rounded px-1 py-1"
                      placeholder="P."
                    />
                  </div>

                  {data.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveItem(idx)}
                      className="text-neutral-400 hover:text-red-500 p-1 rounded"
                      title="Remove row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total & Quick Sum Bar */}
          <div className="flex items-center justify-between bg-blue-50/70 border border-blue-100 p-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-700" />
              <span className="font-semibold text-neutral-800">Total Bill Amount:</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-neutral-600">Rs.</span>
              <input
                type="text"
                value={data.totalRs}
                onChange={(e) => onChange({ totalRs: e.target.value })}
                className="w-20 font-black text-sm bg-white border border-blue-200 rounded px-2 py-1 text-right text-blue-900"
              />
              <span className="text-xs font-bold text-neutral-600">P.</span>
              <input
                type="text"
                value={data.totalPaise}
                onChange={(e) => onChange({ totalPaise: e.target.value })}
                className="w-10 font-black text-sm bg-white border border-blue-200 rounded px-1 py-1 text-center text-blue-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Station & Dealer Configuration */}
      {activeTab === 'station' && (
        <div className="space-y-3 flex-1 overflow-y-auto pr-1 text-xs">
          <div>
            <label className="block font-medium text-neutral-700 mb-1">Filling Station Name</label>
            <input
              type="text"
              value={data.stationName}
              onChange={(e) => onChange({ stationName: e.target.value })}
              className="w-full bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-receipt-serif font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Dealer Line 1</label>
              <input
                type="text"
                value={data.dealerLine1}
                onChange={(e) => onChange({ dealerLine1: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Dealer Line 2</label>
              <input
                type="text"
                value={data.dealerLine2}
                onChange={(e) => onChange({ dealerLine2: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Address Line 1</label>
              <input
                type="text"
                value={data.addressLine1}
                onChange={(e) => onChange({ addressLine1: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Address Line 2</label>
              <input
                type="text"
                value={data.addressLine2}
                onChange={(e) => onChange({ addressLine2: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Telephone ☎</label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 mb-1">TIN Number</label>
              <input
                type="text"
                value={data.tin}
                onChange={(e) => onChange({ tin: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Terms 1</label>
              <input
                type="text"
                value={data.termsLine1}
                onChange={(e) => onChange({ termsLine1: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 mb-1">Terms 2 (Jurisdiction)</label>
              <input
                type="text"
                value={data.termsLine2}
                onChange={(e) => onChange({ termsLine2: e.target.value })}
                className="w-full bg-white border border-neutral-200 rounded-lg px-2 py-1.5 text-xs"
              />
            </div>
          </div>

          {/* Logos Customization */}
          <div className="pt-2 border-t border-neutral-200 space-y-2">
            <span className="font-semibold text-neutral-800 block">Header Logos</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Left Logo */}
              <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">Left Logo (BPCL)</span>
                  {data.leftLogoImage && (
                    <button
                      type="button"
                      onClick={() => onChange({ leftLogoImage: null })}
                      className="text-[10px] text-red-600 hover:text-red-800"
                    >
                      Reset SVG
                    </button>
                  )}
                </div>
                <label className="flex items-center justify-center gap-1.5 w-full bg-white hover:bg-neutral-100 border border-dashed border-neutral-300 rounded py-1.5 cursor-pointer text-[11px] text-neutral-600">
                  <span>{data.leftLogoImage ? 'Change Image' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            onChange({ leftLogoImage: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>

              {/* Right Logo */}
              <div className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">Top-Right Logo (AGL)</span>
                  {data.rightLogoImage && (
                    <button
                      type="button"
                      onClick={() => onChange({ rightLogoImage: null })}
                      className="text-[10px] text-red-600 hover:text-red-800"
                    >
                      Reset SVG
                    </button>
                  )}
                </div>
                <label className="flex items-center justify-center gap-1.5 w-full bg-white hover:bg-neutral-100 border border-dashed border-neutral-300 rounded py-1.5 cursor-pointer text-[11px] text-neutral-600">
                  <span>{data.rightLogoImage ? 'Change Image' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            onChange({ rightLogoImage: reader.result });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Ink Color, Handwriting Style & Signature */}
      {activeTab === 'style' && (
        <div className="space-y-4 flex-1 overflow-y-auto pr-1 text-xs">
          {/* Ink Color Selection */}
          <div>
            <label className="block font-semibold text-neutral-800 mb-1.5">Printed Ink Color</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onChange({ inkColor: 'petrol-blue' })}
                className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  data.inkColor === 'petrol-blue'
                    ? 'border-[#1a3d94] bg-blue-50 text-[#1a3d94] font-bold shadow-xs'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#1a3d94]" />
                <span>Petrol Blue</span>
              </button>

              <button
                type="button"
                onClick={() => onChange({ inkColor: 'deep-navy' })}
                className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  data.inkColor === 'deep-navy'
                    ? 'border-[#0e2764] bg-indigo-50 text-[#0e2764] font-bold shadow-xs'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#0e2764]" />
                <span>Deep Navy</span>
              </button>

              <button
                type="button"
                onClick={() => onChange({ inkColor: 'carbon-black' })}
                className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  data.inkColor === 'carbon-black'
                    ? 'border-neutral-800 bg-neutral-100 text-neutral-900 font-bold shadow-xs'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#1f242e]" />
                <span>Carbon Black</span>
              </button>
            </div>
          </div>

          {/* Pen / Fill Typography */}
          <div>
            <label className="block font-semibold text-neutral-800 mb-1.5">Pen / Filling Font Style</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onChange({ fontStyle: 'handwritten' })}
                className={`py-2 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer text-center ${
                  data.fontStyle === 'handwritten'
                    ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="font-handwritten text-lg leading-tight text-blue-700">1/7/26 (Pen)</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Authentic Hand</div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ fontStyle: 'stamp' })}
                className={`py-2 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer text-center ${
                  data.fontStyle === 'stamp'
                    ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="font-stamp text-sm leading-tight text-neutral-800">1/7/26</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Stamp / Mono</div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ fontStyle: 'typed' })}
                className={`py-2 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer text-center ${
                  data.fontStyle === 'typed'
                    ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="font-sans-ui text-sm font-semibold text-neutral-800">1/7/26</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">Clean Print</div>
              </button>
            </div>
          </div>

          {/* Signature Configuration */}
          <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-800 flex items-center gap-1.5">
                <PenTool className="w-3.5 h-3.5 text-blue-600" />
                Signature
              </span>

              <button
                type="button"
                onClick={onOpenSignaturePad}
                className="text-xs font-medium text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-2.5 py-1 rounded-md shadow-2xs hover:bg-blue-50 transition-colors cursor-pointer"
              >
                Draw Custom Signature
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <button
                type="button"
                onClick={() => onChange({ signatureMode: 'handwritten', signatureImage: null })}
                className={`py-1.5 px-2 rounded border text-xs ${
                  data.signatureMode === 'handwritten' && !data.signatureImage
                    ? 'border-blue-600 bg-white font-bold text-blue-700'
                    : 'border-neutral-200 bg-white/50 text-neutral-600'
                }`}
              >
                Cursive Script
              </button>

              <button
                type="button"
                onClick={() => onChange({ signatureMode: 'typed', signatureImage: null })}
                className={`py-1.5 px-2 rounded border text-xs ${
                  data.signatureMode === 'typed' && !data.signatureImage
                    ? 'border-blue-600 bg-white font-bold text-blue-700'
                    : 'border-neutral-200 bg-white/50 text-neutral-600'
                }`}
              >
                Italic Text
              </button>

              <button
                type="button"
                onClick={() => onChange({ signatureMode: 'blank', signatureImage: null })}
                className={`py-1.5 px-2 rounded border text-xs ${
                  data.signatureMode === 'blank'
                    ? 'border-blue-600 bg-white font-bold text-blue-700'
                    : 'border-neutral-200 bg-white/50 text-neutral-600'
                }`}
              >
                Blank for Pen
              </button>
            </div>

            {data.signatureImage && (
              <div className="flex items-center justify-between bg-white p-2 rounded border border-green-200">
                <div className="flex items-center gap-1.5 text-green-700 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Custom Drawn Signature Active
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ signatureImage: null })}
                  className="text-xs text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Clear Drawing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Helper buttons */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
        <button
          type="button"
          onClick={onClearFields}
          className="text-neutral-500 hover:text-neutral-800 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          Clear Amounts
        </button>

        <span className="text-[11px] text-neutral-400">
          Tip: Press <kbd className="px-1 py-0.5 bg-neutral-100 rounded border border-neutral-200 font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-neutral-100 rounded border border-neutral-200 font-mono text-[10px]">P</kbd> to print
        </span>
      </div>
    </div>
  );
}

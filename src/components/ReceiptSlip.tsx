import { ReceiptData, ReceiptItem } from '../types';
import { BharatPetroleumLogo, AavantikaGasLogo, TelephoneSymbol } from './Logos';

interface ReceiptSlipProps {
  data: ReceiptData;
  onChange: (updated: Partial<ReceiptData>) => void;
  onItemChange: (index: number, updatedItem: Partial<ReceiptItem>) => void;
  onOpenSignaturePad?: () => void;
  isPrintPreview?: boolean;
}

export function ReceiptSlip({
  data,
  onChange,
  onItemChange,
  onOpenSignaturePad,
  isPrintPreview = false,
}: ReceiptSlipProps) {
  // Map ink color to styling classes and hex
  const inkColorClasses = {
    'petrol-blue': {
      text: 'text-[#1a3d94]',
      border: 'border-[#1a3d94]',
      bgAccent: 'bg-[#1a3d94]/5',
      inkHex: '#1a3d94',
      penHex: '#123282',
    },
    'deep-navy': {
      text: 'text-[#0e2764]',
      border: 'border-[#0e2764]',
      bgAccent: 'bg-[#0e2764]/5',
      inkHex: '#0e2764',
      penHex: '#091c49',
    },
    'carbon-black': {
      text: 'text-[#1f242e]',
      border: 'border-[#1f242e]',
      bgAccent: 'bg-[#1f242e]/5',
      inkHex: '#1f242e',
      penHex: '#111317',
    },
  }[data.inkColor];

  const valueFontClass = {
    handwritten: 'font-handwritten text-xl tracking-wide',
    typed: 'font-sans-ui font-semibold text-sm',
    stamp: 'font-stamp font-bold text-base tracking-wider',
  }[data.fontStyle];

  const handleFieldChange = (field: keyof ReceiptData, value: any) => {
    onChange({ [field]: value });
  };

  const handleItemValueChange = (
    index: number,
    field: keyof ReceiptItem,
    value: any
  ) => {
    const currentItem = data.items[index];
    const updated: Partial<ReceiptItem> = { [field]: value };

    // Auto-calculate amount if quantity and rate are changed and autoCalculate is on
    if (data.autoCalculate && (field === 'qnty' || field === 'rate')) {
      const qntyVal = field === 'qnty' ? parseFloat(value) : parseFloat(currentItem.qnty);
      // Clean rate string (replace / with .)
      const rawRate = field === 'rate' ? value : currentItem.rate;
      const rateVal = parseFloat(rawRate.replace('/', '.'));

      if (!isNaN(qntyVal) && !isNaN(rateVal)) {
        const totalAmount = qntyVal * rateVal;
        const totalFloor = Math.floor(totalAmount);
        const paise = Math.round((totalAmount - totalFloor) * 100);
        updated.amountRs = totalFloor.toString();
        updated.amountPaise = paise > 0 ? paise.toString().padStart(2, '0') : '-';
      }
    }

    onItemChange(index, updated);
  };

  return (
    <div
      id="printable-slip-target"
      className={`receipt-paper-slip relative w-full max-w-[430px] sm:w-[420px] bg-white border-2 ${inkColorClasses.border} ${inkColorClasses.text} rounded-[18px] p-4 sm:p-5 shadow-lg transition-all select-none print:shadow-none print:border-2 print:m-0`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Header: CASH/CREDIT MEMO & Telephone */}
      <div className="flex items-center justify-between pb-1.5 pt-0.5 px-1 border-b-0">
        <div className="flex items-center">
          <span className="font-bold text-xs sm:text-[13px] tracking-wider uppercase border-b-2 border-current pb-0.5">
            {data.memoTitle}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-[13px]">
          <TelephoneSymbol className="w-3.5 h-3.5 inline-block" />
          <span className="text-[12px]">:</span>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            className="w-20 font-bold text-right bg-transparent border-b border-dashed border-current/30 hover:border-current focus:border-current focus:outline-none px-0.5 py-0 text-xs sm:text-[13px]"
            title="Edit Phone Number"
          />
        </div>
      </div>

      {/* 2. Main Station Row: Bharat Petroleum (Left) | Bordered Dealer Details Box (Center) | Aavantika Gas Logo (Top Right) */}
      <div className="my-2.5 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Left: Bharat Petroleum Logo */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <BharatPetroleumLogo
            className="w-13 sm:w-15"
            customImageUrl={data.leftLogoImage}
            onUploadImage={(url) => onChange({ leftLogoImage: url })}
          />
        </div>

        {/* Center: Dealer Details with distinct rounded border matching screenshot */}
        <div className={`flex-1 text-center px-2 py-1.5 sm:py-2 border-[1.5px] ${inkColorClasses.border} rounded-2xl sm:rounded-[18px] flex flex-col items-center justify-center relative bg-gradient-to-b from-current/[0.02] to-current/[0.04]`}>
          <input
            type="text"
            value={data.stationName}
            onChange={(e) => handleFieldChange('stationName', e.target.value)}
            className="font-receipt-serif font-black text-center w-full text-base sm:text-lg tracking-tight bg-transparent hover:bg-current/5 focus:bg-current/5 focus:outline-none rounded px-1 leading-tight"
            title="Edit Station Name"
          />
          <input
            type="text"
            value={data.dealerLine1}
            onChange={(e) => handleFieldChange('dealerLine1', e.target.value)}
            className="font-bold text-center w-full text-[10px] sm:text-[11px] tracking-tight bg-transparent hover:bg-current/5 focus:bg-current/5 focus:outline-none rounded px-0.5 leading-tight mt-0.5"
            title="Dealer line 1"
          />
          <input
            type="text"
            value={data.dealerLine2}
            onChange={(e) => handleFieldChange('dealerLine2', e.target.value)}
            className="font-bold text-center w-full text-[10px] sm:text-[11px] tracking-tight bg-transparent hover:bg-current/5 focus:bg-current/5 focus:outline-none rounded px-0.5 leading-tight"
            title="Dealer line 2"
          />
          <input
            type="text"
            value={data.addressLine1}
            onChange={(e) => handleFieldChange('addressLine1', e.target.value)}
            className="text-center w-full text-[9px] sm:text-[10px] font-semibold tracking-tight bg-transparent hover:bg-current/5 focus:bg-current/5 focus:outline-none rounded px-0.5 leading-tight mt-0.5 opacity-90"
            title="Address line 1"
          />
          <input
            type="text"
            value={data.addressLine2}
            onChange={(e) => handleFieldChange('addressLine2', e.target.value)}
            className="text-center w-full text-[9px] sm:text-[10px] font-semibold tracking-tight bg-transparent hover:bg-current/5 focus:bg-current/5 focus:outline-none rounded px-0.5 leading-tight opacity-90"
            title="Address line 2"
          />
        </div>

        {/* Right: Top Right Corner Logo (Aavantika Gas Limited) */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <AavantikaGasLogo
            className="w-12 sm:w-14"
            customImageUrl={data.rightLogoImage}
            onUploadImage={(url) => onChange({ rightLogoImage: url })}
          />
        </div>
      </div>

      {/* 3. Customer Info (M/s ... and Vehicle No ... Date ...) */}
      <div className="space-y-1.5 my-2.5 px-0.5 text-xs sm:text-[13px] font-medium">
        {/* M/s Line */}
        <div className="flex items-end w-full">
          <span className="font-bold mr-1 select-none">M/s.</span>
          <div className="relative flex-1 border-b border-dotted border-current/80">
            <input
              type="text"
              placeholder="..................................................................................................."
              value={data.customerName}
              onChange={(e) => handleFieldChange('customerName', e.target.value)}
              className={`w-full bg-transparent focus:outline-none px-1 text-left ${valueFontClass}`}
              style={{ color: data.customerName ? inkColorClasses.penHex : undefined }}
              title="Enter Customer / Firm Name"
            />
          </div>
        </div>

        {/* Vehicle No & Date Line */}
        <div className="flex items-end justify-between gap-2 w-full pt-0.5">
          <div className="flex items-end flex-1 min-w-0">
            <span className="font-bold mr-1 select-none whitespace-nowrap">Vehicle No.</span>
            <div className="relative flex-1 border-b border-dotted border-current/80">
              <input
                type="text"
                placeholder="......................................................"
                value={data.vehicleNo}
                onChange={(e) => handleFieldChange('vehicleNo', e.target.value)}
                className={`w-full bg-transparent focus:outline-none px-1 text-left ${valueFontClass}`}
                style={{ color: data.vehicleNo ? inkColorClasses.penHex : undefined }}
                title="Enter Vehicle Number"
              />
            </div>
          </div>

          <div className="flex items-end flex-shrink-0">
            <span className="font-bold mr-1.5 select-none">Date</span>
            <div className="border-b border-dotted border-current/80">
              <input
                type="text"
                value={data.date}
                onChange={(e) => handleFieldChange('date', e.target.value)}
                className={`w-20 bg-transparent focus:outline-none text-center font-bold ${valueFontClass}`}
                style={{ color: data.date ? inkColorClasses.penHex : undefined }}
                title="Enter Date (e.g. 1/7/26)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Particulars Table */}
      <div className={`border-t-[1.5px] border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] ${inkColorClasses.border} rounded-sm overflow-hidden my-2`}>
        {/* Table Header */}
        <div className={`grid grid-cols-12 border-b-[1.5px] ${inkColorClasses.border} font-bold text-xs sm:text-[12px] text-center divide-x-[1.5px] divide-current`}>
          <div className="col-span-4 py-1 px-1.5 text-left font-bold">Particulars</div>
          <div className="col-span-2 py-1 px-0.5 text-center font-bold">Qnty.</div>
          <div className="col-span-2 py-1 px-0.5 text-center font-bold">Rate</div>
          <div className="col-span-4 grid grid-cols-12 divide-x-[1.5px] divide-current">
            <div className="col-span-12 py-0.5 border-b-[1.5px] border-current text-center font-bold">Amount</div>
            <div className="col-span-8 py-0.5 text-center font-bold text-[11px]">Rs.</div>
            <div className="col-span-4 py-0.5 text-center font-bold text-[11px]">P.</div>
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y-[1.5px] divide-current text-xs">
          {data.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`grid grid-cols-12 divide-x-[1.5px] divide-current items-stretch min-h-[28px] sm:min-h-[30px] ${
                item.marked ? 'bg-current/[0.02]' : ''
              }`}
            >
              {/* Particulars & Marked tick/dash */}
              <div className="col-span-4 py-1 px-1.5 flex items-center justify-between">
                <span className="font-bold text-xs sm:text-[12.5px]">{item.particular}</span>
                <input
                  type="text"
                  value={item.marked ? (item.marked === true ? '—' : String(item.marked)) : ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    onItemChange(idx, { marked: val !== '' });
                  }}
                  className={`w-5 text-center font-bold bg-transparent focus:outline-none ${valueFontClass}`}
                  placeholder=""
                  title="Marker / dash"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-2 py-0.5 px-0.5 flex items-center justify-center">
                <input
                  type="text"
                  value={item.qnty}
                  onChange={(e) => handleItemValueChange(idx, 'qnty', e.target.value)}
                  className={`w-full text-center bg-transparent focus:outline-none ${valueFontClass}`}
                  style={{ color: item.qnty ? inkColorClasses.penHex : undefined }}
                  placeholder=""
                />
              </div>

              {/* Rate */}
              <div className="col-span-2 py-0.5 px-0.5 flex items-center justify-center">
                <input
                  type="text"
                  value={item.rate}
                  onChange={(e) => handleItemValueChange(idx, 'rate', e.target.value)}
                  className={`w-full text-center bg-transparent focus:outline-none ${valueFontClass}`}
                  style={{ color: item.rate ? inkColorClasses.penHex : undefined }}
                  placeholder=""
                />
              </div>

              {/* Amount (Rs & P) */}
              <div className="col-span-4 grid grid-cols-12 divide-x-[1.5px] divide-current">
                {/* Rs. */}
                <div className="col-span-8 py-0.5 px-0.5 flex items-center justify-center">
                  <input
                    type="text"
                    value={item.amountRs}
                    onChange={(e) => handleItemValueChange(idx, 'amountRs', e.target.value)}
                    className={`w-full text-center font-bold bg-transparent focus:outline-none ${valueFontClass}`}
                    style={{ color: item.amountRs ? inkColorClasses.penHex : undefined }}
                    placeholder=""
                  />
                </div>
                {/* P. */}
                <div className="col-span-4 py-0.5 px-0.5 flex items-center justify-center">
                  <input
                    type="text"
                    value={item.amountPaise}
                    onChange={(e) => handleItemValueChange(idx, 'amountPaise', e.target.value)}
                    className={`w-full text-center bg-transparent focus:outline-none ${valueFontClass}`}
                    style={{ color: item.amountPaise ? inkColorClasses.penHex : undefined }}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Total Row */}
          <div className="grid grid-cols-12 divide-x-[1.5px] divide-current items-stretch min-h-[30px] font-bold">
            {/* Empty particulars & qnty column */}
            <div className="col-span-4 py-1 px-1.5 bg-transparent" />
            <div className="col-span-2 py-1 px-0.5" />

            {/* Total Label */}
            <div className="col-span-2 py-1 px-0.5 flex items-center justify-center text-xs sm:text-[13px] font-black uppercase">
              Total
            </div>

            {/* Total Amount (Rs & P) */}
            <div className="col-span-4 grid grid-cols-12 divide-x-[1.5px] divide-current">
              <div className="col-span-8 py-0.5 px-0.5 flex items-center justify-center">
                <input
                  type="text"
                  value={data.totalRs}
                  onChange={(e) => handleFieldChange('totalRs', e.target.value)}
                  className={`w-full text-center font-black bg-transparent focus:outline-none ${valueFontClass}`}
                  style={{ color: data.totalRs ? inkColorClasses.penHex : undefined }}
                  title="Total Rs."
                />
              </div>
              <div className="col-span-4 py-0.5 px-0.5 flex items-center justify-center">
                <input
                  type="text"
                  value={data.totalPaise}
                  onChange={(e) => handleFieldChange('totalPaise', e.target.value)}
                  className={`w-full text-center font-black bg-transparent focus:outline-none ${valueFontClass}`}
                  style={{ color: data.totalPaise ? inkColorClasses.penHex : undefined }}
                  title="Total Paise"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Footer: TIN, Terms, Memo No (Center), and Signature (Right) */}
      <div className="mt-2.5 pt-1.5 flex items-center justify-between gap-2 text-xs border-t border-current/15">
        {/* Left: TIN and Service notes */}
        <div className="flex-1 space-y-1 text-[10px] sm:text-[11px] leading-tight min-w-0">
          {/* Strictly single-line TIN Number */}
          <div className="font-bold flex items-center gap-1.5 whitespace-nowrap text-[11px] sm:text-[11.5px]">
            <span className="flex-shrink-0 select-none">TIN -</span>
            <input
              type="text"
              value={data.tin}
              onChange={(e) => handleFieldChange('tin', e.target.value)}
              className="font-bold w-36 min-w-[130px] bg-transparent hover:border-b border-dashed border-current focus:outline-none px-0.5 tracking-wider whitespace-nowrap"
              title="TIN Number"
            />
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-medium opacity-95 whitespace-nowrap">
            <span className="flex-shrink-0">•</span>
            <input
              type="text"
              value={data.termsLine1}
              onChange={(e) => handleFieldChange('termsLine1', e.target.value)}
              className="w-full bg-transparent hover:border-b border-dashed border-current focus:outline-none px-0.5 truncate"
              title="Terms Line 1"
            />
          </div>
          <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] font-medium opacity-95 whitespace-nowrap">
            <span className="flex-shrink-0">•</span>
            <input
              type="text"
              value={data.termsLine2}
              onChange={(e) => handleFieldChange('termsLine2', e.target.value)}
              className="w-full bg-transparent hover:border-b border-dashed border-current focus:outline-none px-0.5 truncate"
              title="Terms Line 2"
            />
          </div>
        </div>

        {/* Center: Receipt/Memo Number (No. 343) */}
        <div className="flex-shrink-0 flex items-center justify-center gap-1.5 px-2 self-center">
          <span className="font-bold text-xs sm:text-[13px]">No.</span>
          <input
            type="text"
            value={data.memoNo}
            onChange={(e) => handleFieldChange('memoNo', e.target.value)}
            className="w-16 font-stamp font-black text-lg sm:text-xl text-center bg-transparent border-b border-dashed border-current/40 hover:border-current focus:border-current focus:outline-none tracking-widest"
            title="Receipt / Memo Number"
          />
        </div>

        {/* Right: Signature Stamp */}
        <div
          className="flex-shrink-0 w-28 sm:w-32 flex flex-col items-center justify-end text-center cursor-pointer group select-none self-end"
          onClick={onOpenSignaturePad}
          title="Click to draw or customize signature"
        >
          <div className="relative w-full h-11 flex items-center justify-center">
            {data.signatureImage ? (
              <img
                src={data.signatureImage}
                alt="Signature"
                className="max-h-full max-w-full object-contain"
              />
            ) : data.signatureMode === 'blank' ? (
              <div className="border border-current rounded-full px-3 py-1 text-[11px] font-bold text-current">
                Signature
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                {/* Oval outline around Signature word matching the photo stamp */}
                <div className="border-[1.5px] border-current rounded-full px-3 py-0.5 text-[11px] font-bold tracking-tight">
                  Signature
                </div>
                {/* Handwritten blue ink signature loop passing through it */}
                <svg
                  viewBox="0 0 100 40"
                  className="w-24 h-10 absolute -top-1 -right-2 text-[#0f3484] pointer-events-none transform -rotate-6"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M 5 25 C 20 15, 30 5, 45 20 C 55 30, 40 38, 50 15 C 60 5, 75 10, 85 25 C 90 28, 95 30, 98 26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 35 28 C 45 32, 60 35, 75 30"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

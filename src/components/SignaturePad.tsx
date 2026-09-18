import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Check, PenTool } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string | null) => void;
  onClose: () => void;
  inkColorHex?: string;
}

export function SignaturePad({ onSave, onClose, inkColorHex = '#1a3d94' }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = inkColorHex;
  }, [inkColorHex]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleApply = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) {
      onSave(null);
    } else {
      onSave(canvas.toDataURL('image/png'));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-xl shadow-2xl p-5 w-full max-w-md border border-neutral-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-neutral-900 text-base">Draw Custom Signature</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 text-sm font-medium px-2 py-1 rounded"
          >
            Cancel
          </button>
        </div>

        <p className="text-xs text-neutral-500 my-2">
          Use your finger or mouse to draw the signature as it should appear on the printed slip.
        </p>

        <div className="relative border-2 border-dashed border-blue-200 rounded-lg bg-neutral-50 overflow-hidden my-3">
          <canvas
            ref={canvasRef}
            width={380}
            height={160}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-40 touch-none cursor-crosshair bg-white"
          />
          <div className="absolute bottom-2 left-3 pointer-events-none text-[11px] text-neutral-300 font-sans">
            Sign above this guide line ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onSave(null);
                onClose();
              }}
              className="text-xs text-neutral-600 hover:text-neutral-800 px-3 py-1.5"
            >
              Use Blank
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 px-4 py-1.5 rounded-md shadow-xs"
            >
              <Check className="w-3.5 h-3.5" />
              Apply Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { FC } from 'react';
import { useEffect } from 'react';

type AddToCartModalProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export const AddToCartModal: FC<AddToCartModalProps> = ({ id, open, onClose }) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ease-in-out ${
        open ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white border border-gray-200 shadow-lg rounded-xl w-full max-w-lg transform transition-all duration-300 ease-in-out ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Modal title</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex justify-center items-center size-7 text-sm font-semibold rounded-full text-gray-800 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh]">
          <p>
            This is a wider card with supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>

        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              console.log(`Save changes for ${id}`);
              onClose();
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
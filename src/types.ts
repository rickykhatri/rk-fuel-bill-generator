export interface ReceiptItem {
  id: string;
  particular: string;
  marked?: boolean;
  qnty: string;
  rate: string;
  amountRs: string;
  amountPaise: string;
}

export interface ReceiptData {
  memoTitle: string;
  phone: string;
  stationName: string;
  dealerLine1: string;
  dealerLine2: string;
  addressLine1: string;
  addressLine2: string;
  customerName: string;
  vehicleNo: string;
  date: string;
  items: ReceiptItem[];
  totalRs: string;
  totalPaise: string;
  tin: string;
  memoNo: string;
  termsLine1: string;
  termsLine2: string;
  signatureMode: 'handwritten' | 'drawn' | 'blank' | 'typed';
  signatureText: string;
  signatureImage: string | null;
  leftLogoImage?: string | null;
  rightLogoImage?: string | null;
  inkColor: 'petrol-blue' | 'deep-navy' | 'carbon-black';
  fontStyle: 'handwritten' | 'typed' | 'stamp';
  autoCalculate: boolean;
}

export const INITIAL_RECEIPT_DATA: ReceiptData = {
  memoTitle: 'CASH/CREDIT MEMO',
  phone: '2559160',
  stationName: 'R.B. Filling Station',
  dealerLine1: 'Dealer : Bharat Petroleum Corp. Ltd.',
  dealerLine2: 'Aavantika Gas Limited',
  addressLine1: 'Mangal Nagar, Hira Nagar Main Road,',
  addressLine2: 'Sukhliya, Indore',
  customerName: '',
  vehicleNo: '',
  date: '1/7/26',
  items: [
    {
      id: 'petrol',
      particular: 'Petrol',
      marked: true,
      qnty: '3',
      rate: '114/50',
      amountRs: '343',
      amountPaise: '-',
    },
    {
      id: 'diesel',
      particular: 'Diesel',
      marked: false,
      qnty: '',
      rate: '',
      amountRs: '',
      amountPaise: '',
    },
    {
      id: 'speed',
      particular: 'Speed',
      marked: false,
      qnty: '',
      rate: '',
      amountRs: '',
      amountPaise: '',
    },
    {
      id: 'lubricants',
      particular: 'Lubricants',
      marked: false,
      qnty: '',
      rate: '',
      amountRs: '',
      amountPaise: '',
    },
    {
      id: 'cng',
      particular: 'CNG',
      marked: false,
      qnty: '',
      rate: '',
      amountRs: '',
      amountPaise: '',
    },
  ],
  totalRs: '343',
  totalPaise: '-',
  tin: '23211103322',
  memoNo: '343',
  termsLine1: '24 Hours service available.',
  termsLine2: 'Subject to Indore Jurisdiction.',
  signatureMode: 'handwritten',
  signatureText: 'Signature',
  signatureImage: null,
  leftLogoImage: null,
  rightLogoImage: null,
  inkColor: 'petrol-blue',
  fontStyle: 'handwritten',
  autoCalculate: true,
};

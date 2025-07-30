export interface TradingNote {
  isin: string;
  group: string;
  currency: string;
  status: 'Green' | 'Red' | 'Yellow';
  bidPrice: number;
  askPrice: number;
  bidSpread: number;
  askSpread: number;
  position: number;
  circle: number;
  markPrice: number;
  fairPrice: number;
  maturity: string;
}

export interface ContextMenuAction {
  label: string;
  icon: string;
  action: string;
}

export interface PriceUpdate {
  isin: string;
  bidPrice: number;
  askPrice: number;
  markPrice: number;
  fairPrice: number;
  timestamp: Date;
}

import { Component, OnInit } from '@angular/core';

interface PriceHistoryEntry {
  timestamp: Date;
  isin: string;
  bidPrice: number;
  askPrice: number;
  markPrice: number;
  fairPrice: number;
  volume: number;
  changePercent: number;
}

@Component({
  selector: 'app-price-history',
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.scss']
})
export class PriceHistoryComponent implements OnInit {
  priceHistory: PriceHistoryEntry[] = [];
  selectedIsin: string = '';
  availableIsins: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadPriceHistory();
    this.loadAvailableIsins();
  }

  private loadAvailableIsins(): void {
    this.availableIsins = [
      'XS123456', 'XS224567', 'XS345678', 'XS456789', 
      'XS567890', 'XS678901', 'XS789012'
    ];
  }

  private loadPriceHistory(): void {
    // Mock historical price data
    const baseTime = new Date();
    this.priceHistory = [];

    for (let i = 0; i < 50; i++) {
      const timestamp = new Date(baseTime.getTime() - (i * 5 * 60 * 1000)); // 5-minute intervals
      this.priceHistory.push({
        timestamp,
        isin: this.availableIsins[Math.floor(Math.random() * this.availableIsins.length)],
        bidPrice: 95 + Math.random() * 10,
        askPrice: 96 + Math.random() * 10,
        markPrice: 95.5 + Math.random() * 10,
        fairPrice: 96.2 + Math.random() * 10,
        volume: Math.floor(Math.random() * 1000000),
        changePercent: (Math.random() - 0.5) * 4
      });
    }

    this.priceHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  onIsinFilter(): void {
    this.loadPriceHistory();
  }

  get filteredHistory(): PriceHistoryEntry[] {
    if (!this.selectedIsin) {
      return this.priceHistory;
    }
    return this.priceHistory.filter(entry => entry.isin === this.selectedIsin);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  formatVolume(value: number): string {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  }

  getChangeClass(change: number): string {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-danger';
    return 'text-muted';
  }
}

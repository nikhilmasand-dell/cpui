import { Component, OnInit } from '@angular/core';

interface BorError {
  id: string;
  timestamp: Date;
  isin: string;
  errorType: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
}

@Component({
  selector: 'app-bor-errors',
  templateUrl: './bor-errors.component.html',
  styleUrls: ['./bor-errors.component.scss']
})
export class BorErrorsComponent implements OnInit {
  borErrors: BorError[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadBorErrors();
  }

  private loadBorErrors(): void {
    // Mock data for BOR errors
    this.borErrors = [
      {
        id: 'BOR001',
        timestamp: new Date('2025-07-29T10:30:00'),
        isin: 'XS123456',
        errorType: 'Price Validation',
        severity: 'High',
        description: 'Bid price exceeds ask price threshold',
        status: 'Open'
      },
      {
        id: 'BOR002',
        timestamp: new Date('2025-07-29T11:15:00'),
        isin: 'XS224567',
        errorType: 'Market Data',
        severity: 'Medium',
        description: 'Stale market data detected',
        status: 'In Progress'
      },
      {
        id: 'BOR003',
        timestamp: new Date('2025-07-29T09:45:00'),
        isin: 'XS345678',
        errorType: 'Position Limit',
        severity: 'Low',
        description: 'Position approaching limit threshold',
        status: 'Resolved'
      }
    ];
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'High': return 'badge bg-danger';
      case 'Medium': return 'badge bg-warning';
      case 'Low': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Open': return 'badge bg-danger';
      case 'In Progress': return 'badge bg-warning';
      case 'Resolved': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  }

  resolveError(errorId: string): void {
    const error = this.borErrors.find(e => e.id === errorId);
    if (error) {
      error.status = 'Resolved';
    }
  }

  getErrorCountByStatus(status: string): number {
    return this.borErrors.filter(error => error.status === status).length;
  }
}

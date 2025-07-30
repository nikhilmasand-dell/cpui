import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { TradingNote, PriceUpdate } from '../models/trading-data.model';
import { SignalRService } from './signalr.service';

@Injectable({
  providedIn: 'root'
})
export class TradingDataService {
  private tradingNotesSubject = new BehaviorSubject<TradingNote[]>([]);
  public tradingNotes$ = this.tradingNotesSubject.asObservable();

  constructor(private signalRService: SignalRService) {
    this.initializeData();
    this.setupPriceUpdates();
  }

  private initializeData(): void {
    const initialData: TradingNote[] = [
      {
        isin: 'XS123456',
        group: 'US Corporates',
        currency: 'USD',
        status: 'Green',
        bidPrice: 98.25,
        askPrice: 99.00,
        bidSpread: 120,
        askSpread: 95,
        position: 5.2,
        circle: 1.2,
        markPrice: 99.00,
        fairPrice: 99.16,
        maturity: '15-Jun-26'
      },
      {
        isin: 'XS224567',
        group: 'US Corporates',
        currency: 'USD',
        status: 'Red',
        bidPrice: 97.50,
        askPrice: 98.29,
        bidSpread: 350,
        askSpread: 175,
        position: -2.1,
        circle: 0.0,
        markPrice: 98.29,
        fairPrice: 101.90,
        maturity: '22-Sep-25'
      },
      {
        isin: 'XS345678',
        group: 'US Corporates',
        currency: 'USD',
        status: 'Yellow',
        bidPrice: 101.25,
        askPrice: 102.05,
        bidSpread: 85,
        askSpread: 110,
        position: 3.7,
        circle: 0.0,
        markPrice: 102.05,
        fairPrice: 96.39,
        maturity: '30-Mar-27'
      },
      {
        isin: 'XS456789',
        group: 'European Financials',
        currency: 'EUR',
        status: 'Green',
        bidPrice: 99.75,
        askPrice: 100.75,
        bidSpread: 105,
        askSpread: 320,
        position: 7.5,
        circle: 0.8,
        markPrice: 96.50,
        fairPrice: 100.05,
        maturity: '18-Nov-26'
      },
      {
        isin: 'XS567890',
        group: 'European Financials',
        currency: 'EUR',
        status: 'Green',
        bidPrice: 89.25,
        askPrice: 99.50,
        bidSpread: 65,
        askSpread: 155,
        position: 4.3,
        circle: 2.5,
        markPrice: 100.10,
        fairPrice: 103.85,
        maturity: '05-Feb-28'
      },
      {
        isin: 'XS678901',
        group: 'Asian Sovereigns',
        currency: 'JPY',
        status: 'Green',
        bidPrice: 102.75,
        askPrice: 97.25,
        bidSpread: 95,
        askSpread: 45,
        position: 0.5,
        circle: 1.5,
        markPrice: 98.85,
        fairPrice: 98.50,
        maturity: '10-Jul-30'
      },
      {
        isin: 'XS789012',
        group: 'Asian Sovereigns',
        currency: 'JPY',
        status: 'Yellow',
        bidPrice: 120.00,
        askPrice: 104.50,
        bidSpread: 135,
        askSpread: 30,
        position: 12.5,
        circle: 8.7,
        markPrice: 103.25,
        fairPrice: 103.79,
        maturity: '25-Apr-29'
      }
    ];

    this.tradingNotesSubject.next(initialData);
  }

  private setupPriceUpdates(): void {
    this.signalRService.priceUpdates$.subscribe(priceUpdates => {
      if (priceUpdates.length > 0) {
        this.updatePrices(priceUpdates);
      }
    });
  }

  private updatePrices(priceUpdates: PriceUpdate[]): void {
    const currentNotes = this.tradingNotesSubject.value;
    const updatedNotes = currentNotes.map(note => {
      const priceUpdate = priceUpdates.find(update => update.isin === note.isin);
      if (priceUpdate) {
        return {
          ...note,
          bidPrice: priceUpdate.bidPrice,
          askPrice: priceUpdate.askPrice,
          markPrice: priceUpdate.markPrice,
          fairPrice: priceUpdate.fairPrice
        };
      }
      return note;
    });

    this.tradingNotesSubject.next(updatedNotes);
  }

  public executeContextAction(action: string, isin: string): void {
    console.log(`Executing ${action} for ISIN: ${isin}`);
    
    switch (action) {
      case 'deltaImpact':
        this.calculateDeltaImpact(isin);
        break;
      case 'correctError':
        this.correctError(isin);
        break;
      case 'shuttleRunService':
        this.runShuttleService(isin);
        break;
      case 'deleteManualNote':
        this.deleteManualNote(isin);
        break;
    }
  }

  private calculateDeltaImpact(isin: string): void {
    console.log(`Calculating delta impact for ${isin}`);
    // Implementation for delta impact calculation
  }

  private correctError(isin: string): void {
    console.log(`Correcting error for ${isin}`);
    // Implementation for error correction
  }

  private runShuttleService(isin: string): void {
    console.log(`Running shuttle service for ${isin}`);
    // Implementation for shuttle run service
  }

  private deleteManualNote(isin: string): void {
    console.log(`Deleting manual note for ${isin}`);
    const currentNotes = this.tradingNotesSubject.value;
    const filteredNotes = currentNotes.filter(note => note.isin !== isin);
    this.tradingNotesSubject.next(filteredNotes);
  }
}

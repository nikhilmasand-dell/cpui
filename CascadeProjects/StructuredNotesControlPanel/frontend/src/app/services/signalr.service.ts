import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { PriceUpdate, TradingNote } from '../models/trading-data.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: HubConnection;
  private priceUpdatesSubject = new BehaviorSubject<PriceUpdate[]>([]);
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);

  public priceUpdates$ = this.priceUpdatesSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5000/pricehub')
      .build();

    this.setupConnection();
  }

  private async setupConnection(): Promise<void> {
    try {
      await this.hubConnection.start();
      this.connectionStatusSubject.next(true);
      console.log('SignalR Connected');

      this.hubConnection.on('PriceUpdate', (priceUpdate: PriceUpdate) => {
        const currentUpdates = this.priceUpdatesSubject.value;
        const updatedList = [...currentUpdates, priceUpdate];
        this.priceUpdatesSubject.next(updatedList);
      });

      this.hubConnection.on('BulkPriceUpdate', (priceUpdates: PriceUpdate[]) => {
        this.priceUpdatesSubject.next(priceUpdates);
      });

    } catch (error) {
      console.error('SignalR Connection Error:', error);
      this.connectionStatusSubject.next(false);
      
      // Retry connection after 5 seconds
      setTimeout(() => this.setupConnection(), 5000);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.hubConnection) {
      await this.hubConnection.stop();
      this.connectionStatusSubject.next(false);
    }
  }

  public async sendMessage(methodName: string, ...args: any[]): Promise<void> {
    if (this.hubConnection.state === 'Connected') {
      await this.hubConnection.invoke(methodName, ...args);
    }
  }
}

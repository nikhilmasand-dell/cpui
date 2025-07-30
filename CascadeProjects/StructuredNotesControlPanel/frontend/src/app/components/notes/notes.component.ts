import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TradingNote, ContextMenuAction } from '../../models/trading-data.model';
import { TradingDataService } from '../../services/trading-data.service';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  @ViewChild('contextMenu', { static: false }) contextMenu!: ElementRef;

  tradingNotes: TradingNote[] = [];
  connectionStatus = false;
  contextMenuVisible = false;
  contextMenuX = 0;
  contextMenuY = 0;
  selectedNote: TradingNote | null = null;
  
  // Filter properties
  selectedDesk: string = '';
  selectedCurrency: string = '';

  contextMenuActions: ContextMenuAction[] = [
    { label: 'Delta Impact', icon: 'fas fa-calculator', action: 'deltaImpact' },
    { label: 'Correct Error', icon: 'fas fa-wrench', action: 'correctError' },
    { label: 'Shuttle Run Service', icon: 'fas fa-shuttle-van', action: 'shuttleRunService' },
    { label: 'Delete Manual Note', icon: 'fas fa-trash', action: 'deleteManualNote' }
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    private tradingDataService: TradingDataService,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    // Subscribe to trading notes
    this.subscriptions.push(
      this.tradingDataService.tradingNotes$.subscribe(notes => {
        this.tradingNotes = notes;
      })
    );

    // Subscribe to connection status
    this.subscriptions.push(
      this.signalRService.connectionStatus$.subscribe(status => {
        this.connectionStatus = status;
      })
    );

    // Hide context menu on outside click
    document.addEventListener('click', this.hideContextMenu.bind(this));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    document.removeEventListener('click', this.hideContextMenu.bind(this));
  }

  onRightClick(event: MouseEvent, note: TradingNote): void {
    event.preventDefault();
    this.selectedNote = note;
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.contextMenuVisible = true;
  }

  onContextMenuAction(action: string): void {
    if (this.selectedNote) {
      this.tradingDataService.executeContextAction(action, this.selectedNote.isin);
    }
    this.hideContextMenu();
  }

  hideContextMenu(): void {
    this.contextMenuVisible = false;
    this.selectedNote = null;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Green': return 'status-green';
      case 'Red': return 'status-red';
      case 'Yellow': return 'status-yellow';
      default: return '';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  formatSpread(value: number): string {
    return `${value} bp`;
  }

  formatPosition(value: number): string {
    return `${value.toFixed(1)}M`;
  }

  trackByIsin(index: number, note: TradingNote): string {
    return note.isin;
  }

  getCurrentTime(): Date {
    return new Date();
  }

  // Control Panel Methods
  loadData(): void {
    console.log('Loading data...');
    // Implement data loading logic
  }

  exportData(format: string): void {
    console.log(`Exporting data as ${format}`);
    // Implement export logic
  }

  addPanel(): void {
    console.log('Adding new panel...');
    // Implement add panel logic
  }

  uploadExcel(): void {
    console.log('Uploading Excel file...');
    // Implement Excel upload logic
  }

  openView(): void {
    console.log('Opening saved view...');
    // Implement open view logic
  }

  setDefaultView(): void {
    console.log('Setting default view...');
    // Implement default view logic
  }

  saveView(): void {
    console.log('Saving current view...');
    // Implement save view logic
  }

  saveAsView(): void {
    console.log('Save view as...');
    // Implement save as logic
  }

  loadErrors(): void {
    console.log('Loading errors...');
    // Implement load errors logic
  }

  addManualNote(): void {
    console.log('Adding manual note...');
    // Implement add manual note logic
  }

  noteLifecycle(): void {
    console.log('Managing note lifecycle...');
    // Implement note lifecycle logic
  }

  manageSubscriptions(): void {
    console.log('Managing subscriptions...');
    // Implement subscriptions logic
  }

  bookAdmin(): void {
    console.log('Opening book admin...');
    // Implement book admin logic
  }
}

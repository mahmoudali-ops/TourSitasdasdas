import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TransferService } from '../../core/services/transfer.service';
import { ItransferWithPrices } from '../../core/interfaces/itransfer';
import { Subscription, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReloadableComponent } from '../reloadable/reloadable.component';
import { ReloadService } from '../../core/services/reload.service';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-transfers-detail',
  standalone: true,
  imports: [CommonModule,TranslatedPipe],
  templateUrl: './transfers-detail.component.html',
  styleUrl: './transfers-detail.component.css'
})
export class TransfersDetailComponent  extends ReloadableComponent  {

  // DetailedTransfer:ItransferWithPrices|null=null;
  DetailedTransfer = signal<ItransferWithPrices | null>(null);

  constructor(
    reloadService: ReloadService,
    private service: TransferService,
    private route: ActivatedRoute,
    private title: Title
  ) {
    super(reloadService);
  }

  ngOnInit(): void {
    this.loadData();
    this.onReload(() => this.loadData());
  }

  private loadData(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const slug =params.get('slug')??'Transfer - TOP PICKS TRAVELS';
          const formattedTitle = slug.replace(/-/g, ' ').toUpperCase();
          this.title.setTitle(`${formattedTitle} | TOP PICKS TRAVELS`);
          return this.service.getDetaildedTransfers(slug);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: res => this.DetailedTransfer.set(res),
        error: err => console.error(err)
      });
  }


}

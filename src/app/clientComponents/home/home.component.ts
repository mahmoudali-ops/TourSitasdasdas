import { CattourService } from './../../core/services/cattour.service';
import {  ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, Inject, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Router, RouterLink } from "@angular/router";
import { DestnatoinService } from '../../core/services/destnatoin.service';
import { IDestnation } from '../../core/interfaces/idestnation';
import { Subscription, takeUntil } from 'rxjs';
import { TourService } from '../../core/services/tour.service';
import { ITour } from '../../core/interfaces/itour';
import { HttpErrorResponse } from '@angular/common/http';
import { ICatTour } from '../../core/interfaces/icat-tour';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { ClientFooterComponent } from "../client-footer/client-footer.component";
import { ReloadableComponent } from '../reloadable/reloadable.component';
import { ReloadService } from '../../core/services/reload.service';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatedPipe, ClientFooterComponent,ClientFooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],   // ← ← المهم هنا

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  extends ReloadableComponent {
  
 constructor(ReloadService:ReloadService) {
    super(ReloadService);
  }

  private readonly destnationservice=inject(DestnatoinService);
  private readonly TourService=inject(TourService);
  private readonly CattourService=inject(CattourService)
  private readonly router=inject(Router);


  AllPopularToursList:WritableSignal<ITour[]>=signal([]);  
  TourSUbs:WritableSignal<Subscription|null>=signal(null);

  PopularDestanion:WritableSignal<IDestnation[]>=signal([]);
  destnationSUbs:WritableSignal<Subscription|null>=signal(null);

  AllPopularHurghadaCat:WritableSignal<ICatTour[]>=signal([]);  
  HurghdadaCatSbss:WritableSignal<Subscription|null>=signal(null);
  ngOnInit(): void {
    this.LoadData();
    this.onReload(() => this.LoadData());
   
   }
   LoadData() {
    this.destnationservice.getAllDestnation()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.PopularDestanion.set(res.data),
        error: err => console.log(err.message)
      });
  
    this.TourService.getAllTours()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.AllPopularToursList.set(res.data),
        error: err => console.log(err.message)
      });
  
    this.CattourService.getAllCAtegorytours()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => this.AllPopularHurghadaCat.set(res.data),
        error: err => console.log(err.message)
      });
  }
  ;
  get HurghadaTours() {
    return this.AllPopularToursList().filter(t => 
      t.destinationName?.toLowerCase() === 'hurghada'
    );
  }
  
  
  // ngOnDestroy(): void {
  //   if(this.TourSUbs()){
  //     this.TourSUbs()?.unsubscribe();
  //   }  
  
  //   if(this.destnationSUbs()){
  //     this.destnationSUbs()?.unsubscribe();
  //   }
  
  //   if(this.HurghdadaCatSbss()){
  //     this.HurghdadaCatSbss()?.unsubscribe();
  //   }
  
  
  // }



}

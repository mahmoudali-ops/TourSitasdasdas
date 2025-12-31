import { ReloadService } from './../../core/services/reload.service';
import { Component, inject, signal, WritableSignal,PLATFORM_ID, Inject  } from '@angular/core';
import { IdetailedCattour } from '../../core/interfaces/icat-tour';
import { Subscription, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CattourService } from '../../core/services/cattour.service';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { ReloadableComponent } from '../reloadable/reloadable.component';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-tour-detail',
  standalone: true,
  imports: [RouterLink,TranslatedPipe],
  templateUrl: './category-tour-detail.component.html',
  styleUrl: './category-tour-detail.component.css'
})
export class CategoryTourDetailComponent  extends ReloadableComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,ReloadService:ReloadService) {
    super(ReloadService);
  }

    DetailedCategoryTour:WritableSignal<IdetailedCattour|null>=signal(null);
    CategorySubs:WritableSignal<Subscription|null>=signal(null);
  
  
    private readonly categoryService=inject(CattourService);
    private readonly activeRouete=inject(ActivatedRoute);
     private readonly titleService=inject(Title);
  
  
    ngOnInit(): void {
      this.LoadData();
      this.onReload(() => this.LoadData());
    }
  
    LoadData(){if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('category-open');
    }
  
    this.activeRouete.paramMap
      .pipe(
        switchMap(params => {
          const slug =params.get('slug')??'Category Tours Details - TOP PICKS TRAVELS';
          const formattedTitle = slug.replace(/-/g, ' ').toUpperCase();
          this.titleService.setTitle(`${formattedTitle} | TOP PICKS TRAVELS`);
          return this.categoryService.getDetaildedCategorTour(slug);
        }),
        takeUntil(this.destroy$) // <-- هنا بنستخدم takeUntil
      )
      .subscribe({
        next: (res) => {
          this.DetailedCategoryTour.set(res);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      });
    
    };
    // ngOnDestroy(): void {
    //   if (isPlatformBrowser(this.platformId)) {
    //     document.body.classList.remove('category-open');
    //   }
    //   if(this.CategorySubs()){
    //     this.CategorySubs()?.unsubscribe();
    //   }
    // }

}

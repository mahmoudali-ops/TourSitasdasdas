import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, TranslatedPipe, RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  blogs = [
    {
      titleKey: 'BLOGS.HURGHADA.TITLE',
      excerptKey: 'BLOGS.HURGHADA.EXCERPT',
      image: 'assets/images/hurghdablogs.jpg',
      date: 'July 2025',
      categoryKey: 'BLOGS.CATEGORY.TRAVEL_TIPS',
      slug: 'hurghadaBlog'

    },
    {
      titleKey: 'BLOGS.LUXOR.TITLE',
      excerptKey: 'BLOGS.LUXOR.EXCERPT',
      image: 'assets/images/luxorblogs.jpg',
      date: 'July 2025',
      categoryKey: 'BLOGS.CATEGORY.HISTORY',
      slug: 'luxorBlog'

    }
  ];
  
  
}

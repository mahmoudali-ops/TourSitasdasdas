import { Component } from '@angular/core';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatedPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.title.setTitle(
      'About Top Picks Travels | Trusted Travel Agency in Hurghada'
    );
  
    this.meta.updateTag({
      name: 'description',
      content:
        'Top Picks Travels is a professional travel agency based in Hurghada, Egypt, offering tours, excursions, desert safaris, and sea trips across Egypt with trusted local guides.'
    });
  
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Top Picks Travels, Hurghada travel agency, Egypt tours, Hurghada excursions, Red Sea tours'
    });
  }

}

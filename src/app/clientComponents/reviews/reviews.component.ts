import { Component } from '@angular/core';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [TranslatedPipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}

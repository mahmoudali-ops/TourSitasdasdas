import { Component } from '@angular/core';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-luxorblog',
  standalone: true,
  imports: [TranslatedPipe],
  templateUrl: './luxorblog.component.html',
  styleUrl: './luxorblog.component.css'
})
export class LuxorblogComponent {

}

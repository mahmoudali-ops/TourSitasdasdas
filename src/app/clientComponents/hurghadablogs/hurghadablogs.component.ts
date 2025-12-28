import { Component } from '@angular/core';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-hurghadablogs',
  standalone: true,
  imports: [TranslatedPipe],
  templateUrl: './hurghadablogs.component.html',
  styleUrl: './hurghadablogs.component.css'
})
export class HurghadablogsComponent {

}

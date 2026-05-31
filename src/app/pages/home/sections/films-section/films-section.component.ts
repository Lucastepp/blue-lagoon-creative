import { Component } from '@angular/core';
import { AutoVideoDirective } from '../../../../shared/auto-video.directive';

@Component({
  selector: 'app-films-section',
  imports: [AutoVideoDirective],
  templateUrl: './films-section.component.html',
})
export class FilmsSectionComponent {}

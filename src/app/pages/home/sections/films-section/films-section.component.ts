import { Component } from '@angular/core';
import { AutoVideoDirective } from '../../../../shared/auto-video.directive';
import { OriginalMediaMarkComponent } from '../../../../shared/original-media-mark.component';

@Component({
  selector: 'app-films-section',
  imports: [AutoVideoDirective, OriginalMediaMarkComponent],
  templateUrl: './films-section.component.html',
})
export class FilmsSectionComponent {}

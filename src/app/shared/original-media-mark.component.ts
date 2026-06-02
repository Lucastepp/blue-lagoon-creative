import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-original-media-mark',
  template: `
    <span class="original-media-mark" aria-hidden="true">
      <span class="original-media-mark-logo"></span>
      <span>Original {{ kind }}</span>
    </span>
  `,
})
export class OriginalMediaMarkComponent {
  @Input() kind: 'photo' | 'footage' = 'photo';
}

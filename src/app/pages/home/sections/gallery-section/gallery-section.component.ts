import { Component, ElementRef, ViewChild } from '@angular/core';
import { OriginalMediaMarkComponent } from '../../../../shared/original-media-mark.component';

@Component({
  selector: 'app-gallery-section',
  imports: [OriginalMediaMarkComponent],
  templateUrl: './gallery-section.component.html',
})
export class GallerySectionComponent {
  @ViewChild('photoGallery') private photoGallery?: ElementRef<HTMLDetailsElement>;

  closeGallery(): void {
    const gallery = this.photoGallery?.nativeElement;
    if (!gallery) return;

    gallery.open = false;
    gallery.querySelector('summary')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}

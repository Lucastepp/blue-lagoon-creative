import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  // TODO: point at the live Sleight & Co. bureau domain once confirmed.
  protected readonly bureauUrl = 'https://sleightandco.example';
}

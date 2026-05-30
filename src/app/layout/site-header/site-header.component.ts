import { Component } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  // TODO: point at the live Sleight & Co. bureau domain once confirmed.
  protected readonly bureauUrl = 'https://sleightandco.example';
}

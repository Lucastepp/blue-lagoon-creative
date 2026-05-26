import { Component } from '@angular/core';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { HomePageComponent } from './pages/home/home-page.component';

@Component({
  selector: 'app-root',
  imports: [HomePageComponent, SiteFooterComponent, SiteHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

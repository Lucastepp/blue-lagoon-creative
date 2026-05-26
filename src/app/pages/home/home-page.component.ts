import { Component } from '@angular/core';
import { ContactSectionComponent } from './sections/contact-section/contact-section.component';
import { FilmsSectionComponent } from './sections/films-section/films-section.component';
import { GallerySectionComponent } from './sections/gallery-section/gallery-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { IntroSectionComponent } from './sections/intro-section/intro-section.component';
import { ProcessSectionComponent } from './sections/process-section/process-section.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ContactSectionComponent,
    FilmsSectionComponent,
    GallerySectionComponent,
    HeroSectionComponent,
    IntroSectionComponent,
    ProcessSectionComponent,
    ServicesSectionComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}

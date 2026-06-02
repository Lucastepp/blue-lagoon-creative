import { Component } from '@angular/core';
import { AiSectionComponent } from './sections/ai-section/ai-section.component';
import { ClientsSectionComponent } from './sections/clients-section/clients-section.component';
import { ContactSectionComponent } from './sections/contact-section/contact-section.component';
import { CtaSectionComponent } from './sections/cta-section/cta-section.component';
import { ExampleFilmSectionComponent } from './sections/example-film-section/example-film-section.component';
import { FaqSectionComponent } from './sections/faq-section/faq-section.component';
import { FilmsSectionComponent } from './sections/films-section/films-section.component';
import { FunnelSectionComponent } from './sections/funnel-section/funnel-section.component';
import { GallerySectionComponent } from './sections/gallery-section/gallery-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { HowitworksSectionComponent } from './sections/howitworks-section/howitworks-section.component';
import { IntroSectionComponent } from './sections/intro-section/intro-section.component';
import { MetricsSectionComponent } from './sections/metrics-section/metrics-section.component';
import { ProblemSectionComponent } from './sections/problem-section/problem-section.component';
import { ProcessSectionComponent } from './sections/process-section/process-section.component';
import { ProjectFinderSectionComponent } from './sections/project-finder-section/project-finder-section.component';
import { PromiseSectionComponent } from './sections/promise-section/promise-section.component';
import { ServicesSectionComponent } from './sections/services-section/services-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    AiSectionComponent,
    ClientsSectionComponent,
    ContactSectionComponent,
    CtaSectionComponent,
    ExampleFilmSectionComponent,
    FaqSectionComponent,
    FilmsSectionComponent,
    FunnelSectionComponent,
    GallerySectionComponent,
    HeroSectionComponent,
    HowitworksSectionComponent,
    IntroSectionComponent,
    MetricsSectionComponent,
    ProblemSectionComponent,
    ProcessSectionComponent,
    ProjectFinderSectionComponent,
    PromiseSectionComponent,
    ServicesSectionComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}

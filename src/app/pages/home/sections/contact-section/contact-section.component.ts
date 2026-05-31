import { Component, ElementRef, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  imports: [FormsModule],
  templateUrl: './contact-section.component.html',
})
export class ContactSectionComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly model = { name: '', email: '', propertyType: '', message: '' };
  protected readonly submitting = signal(false);
  protected readonly sent = signal(false);
  protected readonly error = signal('');

  protected firstName(): string {
    return this.model.name.trim().split(' ')[0];
  }

  protected async submit(form: NgForm): Promise<void> {
    this.error.set('');

    if (form.invalid) {
      form.control.markAllAsTouched();
      // Move focus to the first invalid field (ui-ux-pro-max: focus-management).
      queueMicrotask(() =>
        this.host.nativeElement.querySelector<HTMLElement>('.project-form .ng-invalid')?.focus(),
      );
      return;
    }

    this.submitting.set(true);
    try {
      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.model.name.trim(),
          email: this.model.email.trim(),
          propertyType: this.model.propertyType,
          message: this.model.message.trim(),
          house: 'Blue Lagoon',
          niche: 'Hospitality',
          source: 'blue-lagoon contact',
        }),
      });
      if (!response.ok) throw new Error('Request failed');
      this.sent.set(true);
    } catch {
      this.error.set('Something went wrong sending that. Please try again in a moment.');
    } finally {
      this.submitting.set(false);
    }
  }
}

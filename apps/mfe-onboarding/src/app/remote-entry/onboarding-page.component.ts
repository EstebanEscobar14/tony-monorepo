import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TonBadgeDirective,
  TonButtonDirective,
  TonCardContentDirective,
  TonCardDescriptionDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
  TonInputDirective,
  TonLabelDirective,
  TonListDirective,
  TonListItemActionDirective,
  TonListItemContentDirective,
  TonListItemDirective,
  TonTextareaDirective,
  TonValidatorDirective,
  TonValidatorHintDirective,
} from '@tony-ui/core';
import {
  buildOnboardingRequests,
  formatShortDate,
  type OnboardingRequest,
  type OnboardingStatus,
} from '@tony-ui/utils';

@Component({
  selector: 'app-onboarding-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TonBadgeDirective,
    TonButtonDirective,
    TonCardContentDirective,
    TonCardDescriptionDirective,
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
    TonInputDirective,
    TonLabelDirective,
    TonListDirective,
    TonListItemActionDirective,
    TonListItemContentDirective,
    TonListItemDirective,
    TonTextareaDirective,
    TonValidatorDirective,
    TonValidatorHintDirective,
  ],
  templateUrl: './onboarding-page.component.html',
  styleUrl: './onboarding-page.component.css',
})
export class OnboardingPageComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly requests = signal(buildOnboardingRequests());
  readonly feedback = signal('Crea una alta rapida o revisa las solicitudes pendientes.');
  readonly onboardingForm = this.formBuilder.nonNullable.group({
    company: ['', [Validators.required, Validators.minLength(3)]],
    contact: ['', [Validators.required, Validators.minLength(3)]],
    region: ['Iberia', Validators.required],
    notes: ['', [Validators.required, Validators.minLength(10)]],
  });

  readonly companyControl = this.onboardingForm.controls.company;
  readonly contactControl = this.onboardingForm.controls.contact;
  readonly regionControl = this.onboardingForm.controls.region;
  readonly notesControl = this.onboardingForm.controls.notes;

  createRequest(): void {
    if (this.onboardingForm.invalid) {
      this.onboardingForm.markAllAsTouched();
      this.feedback.set('Revisa las validaciones del formulario antes de enviar la alta.');
      return;
    }

    const value = this.onboardingForm.getRawValue();
    const nextItem: OnboardingRequest = {
      id: `ONB-${200 + this.requests().length + 1}`,
      company: value.company,
      contact: value.contact,
      region: value.region,
      status: 'Draft',
      submittedAt: new Date().toISOString(),
      step: 'Intake',
    };

    this.requests.update((items) => [nextItem, ...items]);
    this.feedback.set(`Alta ${nextItem.id} creada para ${nextItem.company}.`);
    this.onboardingForm.reset({
      company: '',
      contact: '',
      region: 'Iberia',
      notes: '',
    });
  }

  formatDate(value: string): string {
    return formatShortDate(value);
  }

  badgeVariant(status: OnboardingStatus): 'default' | 'secondary' | 'outline' {
    if (status === 'Approved') {
      return 'secondary';
    }

    return status === 'Draft' ? 'outline' : 'default';
  }
}

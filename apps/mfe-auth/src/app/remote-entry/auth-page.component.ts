import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  TonAlertDescriptionDirective,
  TonAlertDirective,
  TonAlertTitleDirective,
  TonBadgeDirective,
  TonButtonDirective,
  TonCardContentDirective,
  TonCardDescriptionDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
  TonInputDirective,
  TonLabelDirective,
  TonSelectComponent,
  type SelectOption,
} from '@tony-ui/core';
import {
  clearAuthSession,
  getRoleLabel,
  readAuthSession,
  saveAuthSession,
  type UserRole,
} from '@tony-ui/utils';

@Component({
  selector: 'app-auth-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TonAlertDescriptionDirective,
    TonAlertDirective,
    TonAlertTitleDirective,
    TonBadgeDirective,
    TonButtonDirective,
    TonCardContentDirective,
    TonCardDescriptionDirective,
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
    TonInputDirective,
    TonLabelDirective,
    TonSelectComponent,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly roleDestinations: Record<UserRole, string> = {
    admin: '/admin',
    analyst: '/analytics',
    compliance: '/compliance',
    operator: '/onboarding',
  };

  readonly getRoleLabel = getRoleLabel;
  readonly roleOptions: SelectOption[] = (['operator', 'compliance', 'analyst', 'admin'] as UserRole[]).map(
    (role) => ({ value: role, label: getRoleLabel(role) })
  );
  readonly session = signal(readAuthSession());
  readonly statusMessage = signal('Accede con un rol del examen para habilitar las rutas protegidas.');
  readonly currentRoleLabel = computed(() => {
    const session = this.session();
    return session ? getRoleLabel(session.role) : 'Sin sesion';
  });
  readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['candidate', [Validators.required, Validators.minLength(3)]],
    password: ['tony-ui', [Validators.required, Validators.minLength(6)]],
    role: ['operator' as UserRole, Validators.required],
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.statusMessage.set('Completa usuario, password y rol antes de continuar.');
      return;
    }

    const session = saveAuthSession({
      username: this.loginForm.getRawValue().username,
      role: this.loginForm.getRawValue().role,
    });

    this.session.set(session);
    this.statusMessage.set(`Sesion iniciada para ${session.displayName} con rol ${getRoleLabel(session.role)}.`);
    void this.router.navigateByUrl(this.roleDestinations[session.role]);
  }

  logout(): void {
    clearAuthSession();
    this.session.set(null);
    this.statusMessage.set('Sesion cerrada. Puedes volver a entrar con otro rol.');
  }
}

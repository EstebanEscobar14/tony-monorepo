import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TonAlertDescriptionDirective,
  TonAlertDirective,
  TonAlertTitleDirective,
  TonButtonDirective,
} from '@tony-ui/core';

@Component({
  selector: 'app-remote-fallback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TonAlertDescriptionDirective, TonAlertDirective, TonAlertTitleDirective, TonButtonDirective],
  template: `
    <section class="remote-fallback">
      <div tonAlert variant="destructive">
        <h2 tonAlertTitle>{{ remoteName }} no esta disponible</h2>
        <p tonAlertDescription>
          El shell sigue operativo. Reintenta la carga del microfrontend o vuelve al inicio para
          continuar la demo.
        </p>
        <div class="actions">
          <button tonBtn type="button" (click)="retry()">Reintentar remote</button>
          <button tonBtn variant="outline" type="button" (click)="goHome()">Volver al inicio</button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .remote-fallback {
      max-width: 48rem;
      margin: 2rem auto;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }
  `,
})
export class RemoteFallbackComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly remoteName = this.route.snapshot.data['remoteName'] ?? 'El remote';

  retry(): void {
    const currentUrl = this.router.url;

    void this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      void this.router.navigateByUrl(currentUrl);
    });
  }

  goHome(): void {
    void this.router.navigateByUrl('/');
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  TonButtonDirective,
  TonCardContentDirective,
  TonCardDescriptionDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
} from '@tony-ui/core';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    TonButtonDirective,
    TonCardContentDirective,
    TonCardDescriptionDirective,
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
  ],
  template: `
    <section class="not-found">
      <article tonCard>
        <div tonCardHeader>
          <p tonCardDescription>Fallback route</p>
          <h2 tonCardTitle>La ruta solicitada no existe</h2>
        </div>
        <div tonCardContent class="content">
          <p>Vuelve al inicio del shell o entra en auth para abrir un dominio protegido.</p>
          <a tonBtn routerLink="/">Volver al inicio</a>
        </div>
      </article>
    </section>
  `,
  styles: `
    .not-found {
      max-width: 48rem;
      margin: 2rem auto;
    }

    .content {
      display: grid;
      gap: 1rem;
    }

    p {
      margin: 0;
      color: var(--ton-muted-foreground);
    }
  `,
})
export class NotFoundComponent {}

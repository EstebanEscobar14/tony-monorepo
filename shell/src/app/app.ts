import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService, TonBadgeDirective, TonButtonDirective } from '@tony-ui/core';
import {
  AUTH_SESSION_EVENT,
  clearAuthSession,
  getRoleLabel,
  readAuthSession,
} from '@tony-ui/utils';
import { environment } from '../environments/environment';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TonBadgeDirective, TonButtonDirective],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  readonly session = signal(readAuthSession());
  readonly docsUrl = environment.docsUrl;
  readonly roleLabel = computed(() => {
    const session = this.session();
    return session ? getRoleLabel(session.role) : 'Invitado';
  });

  private readonly syncSession = () => {
    this.session.set(readAuthSession());
  };

  ngOnInit(): void {
    window.addEventListener(AUTH_SESSION_EVENT, this.syncSession);
  }

  ngOnDestroy(): void {
    window.removeEventListener(AUTH_SESSION_EVENT, this.syncSession);
  }

  toggleTheme(): void {
    this.themeService.toggleDark();
  }

  logout(): void {
    clearAuthSession();
    this.syncSession();
  }
}

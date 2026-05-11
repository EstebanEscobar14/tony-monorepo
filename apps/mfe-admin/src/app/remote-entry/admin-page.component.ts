import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  TonBadgeDirective,
  TonButtonDirective,
  TonCardContentDirective,
  TonCardDescriptionDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
  TonListDirective,
  TonListItemActionDirective,
  TonListItemContentDirective,
  TonListItemDirective,
} from '@tony-ui/core';
import { buildAdminMetrics, buildAdminSettings, formatShortDate } from '@tony-ui/utils';

@Component({
  selector: 'app-admin-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TonBadgeDirective,
    TonButtonDirective,
    TonCardContentDirective,
    TonCardDescriptionDirective,
    TonCardDirective,
    TonCardHeaderDirective,
    TonCardTitleDirective,
    TonListDirective,
    TonListItemActionDirective,
    TonListItemContentDirective,
    TonListItemDirective,
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
})
export class AdminPageComponent {
  readonly metrics = buildAdminMetrics();
  readonly settings = buildAdminSettings();

  formatDate(value: string): string {
    return formatShortDate(value);
  }

  activateDrafts(): void {
    // Placeholder for a real facade call once backend contracts are available.
  }
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
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
  TonSelectComponent,
  type SelectOption,
} from '@tony-ui/core';
import {
  buildComplianceCases,
  formatShortDate,
  type ComplianceCase,
  type ComplianceCaseStatus,
} from '@tony-ui/utils';

function escapeCsvValue(value: string | number): string {
  const serialized = String(value);

  if (!/[",\n\r]/.test(serialized)) {
    return serialized;
  }

  return `"${serialized.replace(/"/g, '""')}"`;
}

@Component({
  selector: 'app-compliance-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    TonSelectComponent,
  ],
  templateUrl: './compliance-page.component.html',
  styleUrl: './compliance-page.component.css',
})
export class CompliancePageComponent {
  private readonly baseCases = buildComplianceCases();

  readonly query = signal('');
  readonly statusOptions: SelectOption[] = [
    { value: 'All', label: 'Todos' },
    { value: 'Open', label: 'Open' },
    { value: 'Review', label: 'Review' },
    { value: 'Escalated', label: 'Escalated' },
    { value: 'Closed', label: 'Closed' },
  ];
  readonly selectedStatus = signal<'All' | ComplianceCaseStatus>('All');
  readonly selectedCaseId = signal(this.baseCases[0]?.id ?? '');
  readonly cases = computed(() =>
    this.baseCases.filter((item) => {
      const matchesQuery =
        this.query().trim().length === 0 ||
        [item.id, item.title, item.owner, item.jurisdiction]
          .join(' ')
          .toLowerCase()
          .includes(this.query().trim().toLowerCase());
      const matchesStatus = this.selectedStatus() === 'All' || item.status === this.selectedStatus();

      return matchesQuery && matchesStatus;
    })
  );
  readonly selectedCase = computed(
    () => this.cases().find((item) => item.id === this.selectedCaseId()) ?? this.cases()[0] ?? null
  );

  setQuery(value: string): void {
    this.query.set(value);
  }

  setStatus(value: string): void {
    this.selectedStatus.set(value as 'All' | ComplianceCaseStatus);
  }

  selectCase(item: ComplianceCase): void {
    this.selectedCaseId.set(item.id);
  }

  formatDate(value: string): string {
    return formatShortDate(value);
  }

  exportReport(): void {
    const lines = [
      ['id', 'title', 'jurisdiction', 'status', 'priority', 'updatedAt'].join(','),
      ...this.cases().map((item) =>
        [item.id, item.title, item.jurisdiction, item.status, item.priority, item.updatedAt]
          .map(escapeCsvValue)
          .join(',')
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'compliance-report.csv';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

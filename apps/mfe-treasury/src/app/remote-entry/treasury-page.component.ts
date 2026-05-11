import { afterNextRender, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TonBadgeDirective, TonDataTableComponent } from '@tony-ui/core';
import { formatCurrency } from '@tony-ui/utils';

const REGIONS = ['Iberia', 'DACH', 'Nordics', 'UK', 'LATAM'];
const OWNERS = ['Treasury Ops', 'Cash Desk', 'Liquidity', 'Risk Control'];
const LOAD_BATCH_SIZE = 2000;

type TreasuryViewRow = {
  id: string;
  account: string;
  region: string;
  owner: string;
  balance: string;
  available: string;
  change: string;
  risk: 'Low' | 'Medium' | 'High';
};

@Component({
  selector: 'app-treasury-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TonBadgeDirective, TonDataTableComponent],
  templateUrl: './treasury-page.component.html',
  styleUrl: './treasury-page.component.css',
})
export class TreasuryPageComponent {
  readonly columns = [
    { key: 'account', label: 'Account', width: '14rem' },
    { key: 'region', label: 'Region', width: '8rem' },
    { key: 'owner', label: 'Owner', width: '10rem' },
    { key: 'balance', label: 'Balance', width: '10rem' },
    { key: 'available', label: 'Available', width: '10rem' },
    { key: 'change', label: 'Change', width: '7rem' },
    { key: 'risk', label: 'Risk', width: '6rem' },
  ];
  readonly rowCount = 80000;
  readonly virtualItemSize = 52;
  readonly rows = signal<TreasuryViewRow[]>([]);
  readonly loadedRows = signal(0);
  readonly loadingRows = signal(true);

  constructor() {
    afterNextRender(() => this.loadRowsProgressively());
  }

  private loadRowsProgressively(startIndex = 0): void {
    const endIndex = Math.min(startIndex + LOAD_BATCH_SIZE, this.rowCount);
    const nextRows: TreasuryViewRow[] = [];

    for (let index = startIndex; index < endIndex; index += 1) {
      nextRows.push(this.buildRow(index));
    }

    this.rows.update((rows) => [...rows, ...nextRows]);
    this.loadedRows.set(endIndex);

    if (endIndex < this.rowCount) {
      setTimeout(() => this.loadRowsProgressively(endIndex), 0);
      return;
    }

    this.loadingRows.set(false);
  }

  private buildRow(index: number): TreasuryViewRow {
    const region = REGIONS[index % REGIONS.length];
    const balance = 750000 + index * 3150;
    const available = Math.round(balance * (0.74 + (index % 5) * 0.04));
    const change = Number((((index % 11) - 5) * 0.43).toFixed(2));

    return {
      id: `ACC-${String(index + 1).padStart(5, '0')}`,
      account: `Main ${region} ${index + 1}`,
      region,
      owner: OWNERS[index % OWNERS.length],
      balance: formatCurrency(balance),
      available: formatCurrency(available),
      change: `${change > 0 ? '+' : ''}${change}%`,
      risk: index % 9 === 0 ? 'High' : index % 4 === 0 ? 'Medium' : 'Low',
    };
  }
}

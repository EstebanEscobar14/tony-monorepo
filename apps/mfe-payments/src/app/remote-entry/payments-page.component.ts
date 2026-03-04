import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  TonBadgeDirective,
  TonButtonDirective,
  TonListDirective,
  TonListItemActionDirective,
  TonListItemContentDirective,
  TonListItemDirective,
} from '@tony-ui/core';
import { buildPaymentsDataset, formatCurrency, type PaymentRecord } from '@tony-ui/utils';

type PaymentViewModel = PaymentRecord & {
  amountLabel: string;
};

@Component({
  selector: 'app-payments-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TonBadgeDirective,
    TonButtonDirective,
    TonListDirective,
    TonListItemActionDirective,
    TonListItemContentDirective,
    TonListItemDirective,
  ],
  templateUrl: './payments-page.component.html',
  styleUrl: './payments-page.component.css',
})
export class PaymentsPageComponent {
  private readonly basePayments = buildPaymentsDataset();
  private readonly beneficiaries = [
    'Helios Trading',
    'Summit Foods',
    'Oceanic Ventures',
    'Vertex Mobility',
    'Crescent Pharma',
  ];
  private readonly channels: PaymentRecord['channel'][] = ['SEPA', 'SWIFT', 'Instant'];
  private readonly currencies: PaymentRecord['currency'][] = ['EUR', 'USD', 'GBP'];

  readonly payments = signal(this.basePayments.map((payment) => this.toViewModel(payment)));
  readonly feedback = signal('Operativa lista para agregar pagos y exportar el lote actual.');

  addPayment(): void {
    const currentSize = this.payments().length;
    const paymentNumber = 1042 + currentSize;
    const payment: PaymentRecord = {
      id: `PAY-${paymentNumber}`,
      beneficiary: this.beneficiaries[currentSize % this.beneficiaries.length],
      amount: 45000 + currentSize * 8750,
      currency: this.currencies[currentSize % this.currencies.length],
      status: 'Scheduled',
      channel: this.channels[currentSize % this.channels.length],
    };

    this.payments.update((payments) => [this.toViewModel(payment), ...payments]);
    this.feedback.set(`Pago ${payment.id} agregado al lote con estado Scheduled.`);
  }

  async exportBatch(): Promise<void> {
    const payments = this.payments();
    this.feedback.set(`Preparando exportacion de ${payments.length} pagos en segundo plano...`);

    try {
      const csv = await this.buildCsv(payments);
      this.downloadCsv(csv, `payments-batch-${payments.length}.csv`);
      this.feedback.set(`Lote exportado con ${payments.length} pagos sin bloquear la UI.`);
    } catch {
      this.feedback.set('No se pudo exportar el lote. Intentalo de nuevo.');
    }
  }

  private async buildCsv(payments: PaymentViewModel[]): Promise<string> {
    try {
      return await this.buildCsvInWorker(payments);
    } catch {
      return await this.buildCsvWithoutWorker(payments);
    }
  }

  private buildCsvInWorker(payments: PaymentViewModel[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const worker = this.createExportWorker();

      worker.onmessage = ({ data }: MessageEvent<string>) => {
        worker.terminate();
        resolve(data);
      };
      worker.onerror = () => {
        worker.terminate();
        reject(new Error('Payment export worker failed'));
      };
      worker.postMessage(payments);
    });
  }

  private createExportWorker(): Worker {
    const workerSource = `
      function escapeCsvValue(value) {
        return '"' + String(value).replace(/"/g, '""') + '"';
      }

      self.addEventListener('message', function(event) {
        var rows = event.data;
        var lines = [['id', 'beneficiary', 'channel', 'currency', 'amount', 'status'].join(',')];

        for (var i = 0; i < rows.length; i += 1) {
          var payment = rows[i];
          lines.push([
            payment.id,
            escapeCsvValue(payment.beneficiary),
            payment.channel,
            payment.currency,
            String(payment.amount),
            payment.status
          ].join(','));
        }

        self.postMessage(lines.join('\\n'));
      });
    `;

    const blob = new Blob([workerSource], { type: 'text/javascript' });
    return new Worker(URL.createObjectURL(blob));
  }

  private buildCsvWithoutWorker(payments: PaymentViewModel[]): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.serializePaymentsCsv(payments)), 0);
    });
  }

  private serializePaymentsCsv(payments: PaymentViewModel[]): string {
    const lines = [
      ['id', 'beneficiary', 'channel', 'currency', 'amount', 'status'].join(','),
      ...payments.map((payment) =>
        [
          payment.id,
          this.escapeCsvValue(payment.beneficiary),
          payment.channel,
          payment.currency,
          String(payment.amount),
          payment.status,
        ].join(',')
      ),
    ];

    return lines.join('\n');
  }

  private escapeCsvValue(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
  }

  private downloadCsv(csv: string, filename: string): void {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  private toViewModel(payment: PaymentRecord): PaymentViewModel {
    return {
      ...payment,
      amountLabel: formatCurrency(payment.amount, payment.currency),
    };
  }

  badgeVariant(status: PaymentRecord['status']): 'default' | 'secondary' | 'outline' {
    if (status === 'Completed') {
      return 'secondary';
    }

    return status === 'Scheduled' ? 'outline' : 'default';
  }
}

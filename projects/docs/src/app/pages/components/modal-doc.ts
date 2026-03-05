import { Component, computed, inject, signal } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CodeBlockComponent } from '../../shared/code-block';
import { ComponentPreviewComponent } from '../../shared/component-preview';
import { PropsTableComponent, type PropDef } from '../../shared/props-table';
import { I18nService } from '../../i18n/i18n.service';
import { MODAL_DOC_EN } from '../../i18n/en/pages/modal-doc';
import { MODAL_DOC_ES } from '../../i18n/es/pages/modal-doc';
import {
  TonButtonDirective,
  TonDialogService,
  TON_DIALOG_DATA,
  TonDialogContentDirective,
  TonDialogHeaderDirective,
  TonDialogTitleDirective,
  TonDialogDescriptionDirective,
  TonDialogFooterDirective,
  TonInputDirective,
  TonLabelDirective,
  TonCardDirective,
  TonCardHeaderDirective,
  TonCardTitleDirective,
  TonCardDescriptionDirective,
  TonToastService,
} from '@tony-ui/core';

interface ProfileData {
  name: string;
  email: string;
}

@Component({
  selector: 'docs-modal-doc',
  standalone: true,
  imports: [
    CodeBlockComponent, ComponentPreviewComponent, PropsTableComponent, TonButtonDirective,
    TonCardDirective, TonCardHeaderDirective, TonCardTitleDirective, TonCardDescriptionDirective,
  ],
  template: `
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ t().title }}</h1>
        <p class="text-muted-foreground mt-2">{{ t().description }}</p>
      </div>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.import }}</h2>
        <docs-code-block [code]="importCode" language="typescript" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().basicDialog }}</h2>
        <docs-component-preview [code]="basicCode">
          <button tonBtn (click)="openBasic()">Open Dialog</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().confirmationDialog }}</h2>
        <docs-component-preview [code]="confirmCode">
          <button tonBtn variant="destructive" (click)="openConfirm()">Delete Item</button>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.examples }}</h2>
        <p class="text-sm text-muted-foreground">{{ t().examplesDescription }}</p>

        <h3 class="text-lg font-medium">{{ t().editFormInDialog }}</h3>
        <docs-component-preview [code]="editFormCode" language="typescript">
          <div class="space-y-3">
            <button tonBtn (click)="openEditProfile()">Edit Profile</button>
            @if (profile().name) {
              <div tonCard class="w-full max-w-sm">
                <div tonCardHeader>
                  <h3 tonCardTitle class="text-base">{{ profile().name }}</h3>
                  <p tonCardDescription>{{ profile().email }}</p>
                </div>
              </div>
            }
          </div>
        </docs-component-preview>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.apiReference }}</h2>
        <h3 class="text-lg font-medium">{{ t().tonDialogService }}</h3>
        <docs-props-table [props]="serviceProps()" />
        <h3 class="text-lg font-medium mt-4">{{ t().tonDialogConfig }}</h3>
        <docs-props-table [props]="configProps()" />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t().contentDirectives }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().contentDirectivesList; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">{{ i18n.common().docSections.accessibility }}</h2>
        <ul class="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          @for (item of t().accessibility; track item) {
            <li [innerHTML]="item"></li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class ModalDocComponent {
  readonly i18n = inject(I18nService);
  readonly t = computed(() => this.i18n.locale() === 'es' ? MODAL_DOC_ES : MODAL_DOC_EN);

  private readonly dialogService = inject(TonDialogService);
  private readonly toastService = inject(TonToastService);

  importCode = `import {
  TonDialogService,
  TonDialogContentDirective,
  TonDialogHeaderDirective,
  TonDialogTitleDirective,
  TonDialogDescriptionDirective,
  TonDialogFooterDirective,
  TonDialogCloseDirective,
} from '@tony-ui/core';`;

  basicCode = `const dialogService = inject(TonDialogService);

dialogService.open(MyDialogComponent);`;

  confirmCode = `const ref = dialogService.open(ConfirmComponent, {
  width: '24rem',
});

ref.closed.subscribe(result => {
  if (result) {
    console.log('Confirmed');
  }
});`;

  readonly serviceProps = computed<PropDef[]>(() => [
    { name: 'open(component, config?)', type: 'TonDialogRef<R>', default: '-', description: this.t().servicePropDescriptions.open },
    { name: 'closeAll()', type: 'void', default: '-', description: this.t().servicePropDescriptions.closeAll },
  ]);

  readonly configProps = computed<PropDef[]>(() => [
    { name: 'width', type: 'string', default: "'28rem'", description: this.t().configPropDescriptions.width },
    { name: 'maxWidth', type: 'string', default: "'90vw'", description: this.t().configPropDescriptions.maxWidth },
    { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: this.t().configPropDescriptions.closeOnBackdrop },
    { name: 'closeOnEsc', type: 'boolean', default: 'true', description: this.t().configPropDescriptions.closeOnEsc },
    { name: 'data', type: 'unknown', default: '-', description: this.t().configPropDescriptions.data },
    { name: 'ariaLabelledBy', type: 'string', default: '-', description: this.t().configPropDescriptions.ariaLabelledBy },
    { name: 'ariaDescribedBy', type: 'string', default: '-', description: this.t().configPropDescriptions.ariaDescribedBy },
  ]);

  // Examples state
  readonly profile = signal<ProfileData>({ name: 'Jane Doe', email: 'jane@example.com' });

  openEditProfile() {
    const ref = this.dialogService.open(EditProfileDialogComponent, {
      data: this.profile(),
    });
    ref.closed.subscribe(result => {
      if (result) {
        this.profile.set(result as ProfileData);
        this.toastService.success('Profile updated!');
      }
    });
  }

  editFormCode = `@Component({
  imports: [TonButtonDirective, TonCardDirective, TonCardHeaderDirective,
            TonCardTitleDirective, TonCardDescriptionDirective],
  template: \`
    <div class="space-y-3">
      <button tonBtn (click)="openEditProfile()">Edit Profile</button>
      @if (profile().name) {
        <div tonCard class="w-full max-w-sm">
          <div tonCardHeader>
            <h3 tonCardTitle class="text-base">{{ profile().name }}</h3>
            <p tonCardDescription>{{ profile().email }}</p>
          </div>
        </div>
      }
    </div>
  \`,
})
export class EditProfileExample {
  private readonly dialogService = inject(TonDialogService);
  private readonly toastService = inject(TonToastService);
  readonly profile = signal<ProfileData>({ name: 'Jane Doe', email: 'jane@example.com' });

  openEditProfile() {
    const ref = this.dialogService.open(EditProfileDialogComponent, {
      data: this.profile(),
    });
    ref.closed.subscribe(result => {
      if (result) {
        this.profile.set(result as ProfileData);
        this.toastService.success('Profile updated!');
      }
    });
  }
}

@Component({
  imports: [ReactiveFormsModule, TonDialogContentDirective, TonDialogHeaderDirective,
            TonDialogTitleDirective, TonDialogDescriptionDirective, TonDialogFooterDirective,
            TonButtonDirective, TonInputDirective, TonLabelDirective],
  template: \`
    <div tonDialogContent>
      <div tonDialogHeader>
        <h2 tonDialogTitle>Edit Profile</h2>
        <p tonDialogDescription>Update your profile information.</p>
      </div>
      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4 py-4">
        <div class="space-y-2">
          <label tonLabel>Name</label>
          <input tonInput formControlName="name" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <label tonLabel>Email</label>
          <input tonInput formControlName="email" type="email" placeholder="you@example.com" />
        </div>
      </form>
      <div tonDialogFooter>
        <button tonBtn variant="outline" (click)="dialogRef.close()">Cancel</button>
        <button tonBtn (click)="save()" [disabled]="form.invalid">Save</button>
      </div>
    </div>
  \`,
})
class EditProfileDialogComponent {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject<ProfileData>(TON_DIALOG_DATA);
  readonly form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}`;

  openBasic() {
    this.dialogService.open(BasicDialogComponent);
  }

  openConfirm() {
    const ref = this.dialogService.open(ConfirmDialogComponent, { width: '24rem' });
    ref.closed.subscribe((result) => {
      if (result) {
        console.log('Confirmed deletion');
      }
    });
  }
}

@Component({
  standalone: true,
  imports: [
    TonDialogContentDirective,
    TonDialogHeaderDirective,
    TonDialogTitleDirective,
    TonDialogDescriptionDirective,
    TonDialogFooterDirective,
    TonButtonDirective,
  ],
  template: `
    <div tonDialogContent>
      <div tonDialogHeader>
        <h2 tonDialogTitle>Basic Dialog</h2>
        <p tonDialogDescription>This is a basic dialog example.</p>
      </div>
      <p class="py-4 text-sm">Dialog content goes here. You can put any content you need.</p>
      <div tonDialogFooter>
        <button tonBtn variant="outline" (click)="dialogRef.close()">Cancel</button>
        <button tonBtn (click)="dialogRef.close()">Continue</button>
      </div>
    </div>
  `,
})
class BasicDialogComponent {
  readonly dialogRef = inject(DialogRef);
}

@Component({
  standalone: true,
  imports: [
    TonDialogContentDirective,
    TonDialogHeaderDirective,
    TonDialogTitleDirective,
    TonDialogDescriptionDirective,
    TonDialogFooterDirective,
    TonButtonDirective,
  ],
  template: `
    <div tonDialogContent>
      <div tonDialogHeader>
        <h2 tonDialogTitle>Are you sure?</h2>
        <p tonDialogDescription>This action cannot be undone. This will permanently delete the item.</p>
      </div>
      <div tonDialogFooter class="mt-4">
        <button tonBtn variant="outline" (click)="dialogRef.close(false)">Cancel</button>
        <button tonBtn variant="destructive" (click)="dialogRef.close(true)">Delete</button>
      </div>
    </div>
  `,
})
class ConfirmDialogComponent {
  readonly dialogRef = inject(DialogRef);
}

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TonDialogContentDirective,
    TonDialogHeaderDirective,
    TonDialogTitleDirective,
    TonDialogDescriptionDirective,
    TonDialogFooterDirective,
    TonButtonDirective,
    TonInputDirective,
    TonLabelDirective,
  ],
  template: `
    <div tonDialogContent>
      <div tonDialogHeader>
        <h2 tonDialogTitle>Edit Profile</h2>
        <p tonDialogDescription>Update your profile information.</p>
      </div>
      <form [formGroup]="form" (ngSubmit)="save()" class="space-y-4 py-4">
        <div class="space-y-2">
          <label tonLabel>Name</label>
          <input tonInput formControlName="name" placeholder="Your name" />
        </div>
        <div class="space-y-2">
          <label tonLabel>Email</label>
          <input tonInput formControlName="email" type="email" placeholder="you@example.com" />
        </div>
      </form>
      <div tonDialogFooter>
        <button tonBtn variant="outline" (click)="dialogRef.close()">Cancel</button>
        <button tonBtn (click)="save()" [disabled]="form.invalid">Save</button>
      </div>
    </div>
  `,
})
class EditProfileDialogComponent {
  readonly dialogRef = inject(DialogRef);
  readonly data = inject<ProfileData>(TON_DIALOG_DATA);
  readonly form = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
  });

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}

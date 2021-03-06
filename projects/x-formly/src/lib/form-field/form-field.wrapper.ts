import { Subject } from 'rxjs';

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { FieldWrapper, FormlyFieldConfig, ɵdefineHiddenProp as defineHiddenProp } from '@ngx-formly/core';

import { FieldType } from './field.type';

interface MatFormlyFieldConfig extends FormlyFieldConfig {
  // tslint:disable-next-line
  _matprefix: TemplateRef<any>;
  // tslint:disable-next-line
  _matsuffix: TemplateRef<any>;
  __formField__: FormlyWrapperFormField;
  // tslint:disable-next-line
  _componentFactory: any;
}

@Component({
  selector: 'formly-wrapper-mat-form-field',
  template: `
    <!-- fix https://github.com/angular/material2/pull/7083 by setting width to 100% -->
    <mat-form-field
      [hideRequiredMarker]="true"
      [floatLabel]="to.floatLabel"
      [appearance]="to.appearance"
      [color]="to.color"
      [style.width]="'100%'"
    >
      <ng-container #fieldComponent></ng-container>
      <mat-label *ngIf="to.label && to.hideLabel !== true">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true" class="mat-form-field-required-marker">*</span>
      </mat-label>

      <ng-container matPrefix>
        <ng-container *ngTemplateOutlet="to.prefix ? to.prefix : formlyField._matprefix"></ng-container>
      </ng-container>

      <ng-container matSuffix>
        <ng-container *ngTemplateOutlet="to.suffix ? to.suffix : formlyField._matsuffix"></ng-container>
      </ng-container>

      <!-- fix https://github.com/angular/material2/issues/7737 by setting id to null  -->
      <mat-error [id]="null">
        <formly-validation-message [field]="field"></formly-validation-message>
      </mat-error>
      <!-- fix https://github.com/angular/material2/issues/7737 by setting id to null  -->
      <mat-hint *ngIf="to.description" [id]="null">{{ to.description }}</mat-hint>
    </mat-form-field>
  `,
  providers: [{ provide: MatFormFieldControl, useExisting: FormlyWrapperFormField }],
})
export class FormlyWrapperFormField extends FieldWrapper<MatFormlyFieldConfig>
  implements OnInit, OnDestroy, /* tslint:disable */ MatFormFieldControl<any>, AfterViewInit, AfterContentChecked {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true }) fieldComponent!: ViewContainerRef;

  @ViewChild(MatFormField, { static: true }) formField!: MatFormField;

  stateChanges = new Subject<void>();

  // tslint:disable-next-line
  _errorState = false;

  private initialGapCalculated = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private focusMonitor: FocusMonitor) {
    super();
  }

  ngOnInit() {
    this.formField._control = this;

    // tslint:disable-next-line
    defineHiddenProp(this.field, '__formField__', this.formField);

    // tslint:disable-next-line
    const fieldComponent = this.formlyField['_componentFactory'];

    if (fieldComponent && !(fieldComponent.componentRef.instance instanceof FieldType)) {
      console.warn(
        `Component '${fieldComponent.component.prototype.constructor.name}' must extend 'FieldType' from 'x-formly'.`
      );
    }

    // fix for https://github.com/angular/material2/issues/11437
    if (this.formlyField.hide && this.formlyField.templateOptions!.appearance === 'outline') {
      this.initialGapCalculated = true;
    }

    this.focusMonitor.monitor(this.elementRef, true).subscribe(origin => {
      if (!origin && this.field.focus) {
        this.field.focus = false;
      }

      this.stateChanges.next();
    });
  }

  ngAfterContentChecked() {
    if (!this.initialGapCalculated || this.formlyField.hide) {
      return;
    }

    this.formField.updateOutlineGap();

    this.initialGapCalculated = true;
  }

  ngAfterViewInit() {
    // temporary fix for https://github.com/angular/material2/issues/7891
    if (this.formField.appearance !== 'outline' && this.to.hideFieldUnderline === true) {
      const underlineElement = this.formField._elementRef.nativeElement.querySelector('.mat-form-field-underline');

      if (underlineElement) {
        this.renderer.removeChild(underlineElement.parentNode, underlineElement);
      }
    }
  }

  ngOnDestroy() {
    delete this.formlyField.__formField__;
    this.stateChanges.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  setDescribedByIds(ids: string[]): void {}

  onContainerClick(event: MouseEvent): void {
    this.formlyField.focus = true;
    this.stateChanges.next();
  }

  get errorState() {
    const showError = this.options!.showError!(this);

    if (showError !== this._errorState) {
      this._errorState = showError;
      this.stateChanges.next();
    }

    return showError;
  }

  get controlType() {
    return this.to.type;
  }

  get focused() {
    return !!this.formlyField.focus && !this.disabled;
  }

  get disabled() {
    return !!this.to.disabled;
  }

  get required() {
    return !!this.to.required;
  }

  get placeholder() {
    return this.to.placeholder || '';
  }

  get shouldPlaceholderFloat() {
    return this.shouldLabelFloat;
  }

  get value() {
    return this.formControl.value;
  }

  get ngControl() {
    // tslint:disable-next-line:no-any
    return this.formControl as any;
  }

  get empty() {
    const { type } = this.field;
    const value = this.formControl.value;

    // data picker always set the result as { [key: string]: any } structure
    // we need to treat the result { [key: string]: null } as an empty result
    if (type === 'date-picker') {
      return value instanceof Object ? Object.values(value).every(v => v === null) : !value;
    }

    return !value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get formlyField() {
    return this.field as MatFormlyFieldConfig;
  }
}

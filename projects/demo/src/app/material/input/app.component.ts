import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { X_FORMLY_TYPES } from 'x-formly';

@Component({
  selector: 'formly-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'Input',
      type: X_FORMLY_TYPES.INPUT,
      templateOptions: {
        label: 'Input',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },
  ];
}

import { XFormlyModule } from 'x-formly';
import { XMatModule } from 'x-material';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';

import { ExamplesRouterViewerComponent, SharedModule } from '../shared';
import { AutocompleteAppComponent } from './autocomplete';
import { CheckboxAppComponent, CheckboxExampleConfig } from './checkbox';
import { DatepickerAppComponent, DatepickerExampleConfig } from './datepicker';
import { debugFields } from './debug-fields';
import { InputAppComponent, InputExampleConfig } from './input';
import { NativeSelectAppComponent, NativeSelectExampleConfig } from './native-select';
import { PasswordAppComponent, PasswordExampleConfig } from './password';
import { RadioAppComponent, RadioExampleConfig } from './radio';
import { SelectAppComponent, SelectExampleConfig } from './select';
import { SliderAppComponent, SliderExampleConfig } from './slider';
import { TextareaAppComponent, TextareaExampleConfig } from './textarea';
import { ToggleAppComponent, ToggleExampleConfig } from './toggle';
import { VerificationCodeAppComponent, VerificationCodeExampleConfig } from './verification-code';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    FormlyModule.forRoot({
      validationMessages: [
        {
          name: 'required',
          message: (err, field) => `${field.templateOptions.label} 为必填项`,
        },
      ],
    }),
    XFormlyModule,
    XMatModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExamplesRouterViewerComponent,
        data: {
          debugFields,
          examples: [
            CheckboxExampleConfig,
            DatepickerExampleConfig,
            InputExampleConfig,
            NativeSelectExampleConfig,
            PasswordExampleConfig,
            RadioExampleConfig,
            SelectExampleConfig,
            SliderExampleConfig,
            TextareaExampleConfig,
            ToggleExampleConfig,
            VerificationCodeExampleConfig,
          ],
        },
      },
    ]),
  ],
  declarations: [
    AutocompleteAppComponent,
    CheckboxAppComponent,
    DatepickerAppComponent,
    InputAppComponent,
    NativeSelectAppComponent,
    PasswordAppComponent,
    RadioAppComponent,
    SelectAppComponent,
    SliderAppComponent,
    TextareaAppComponent,
    ToggleAppComponent,
    VerificationCodeAppComponent,
  ],
  entryComponents: [
    AutocompleteAppComponent,
    CheckboxAppComponent,
    DatepickerAppComponent,
    InputAppComponent,
    NativeSelectAppComponent,
    PasswordAppComponent,
    RadioAppComponent,
    SelectAppComponent,
    SliderAppComponent,
    TextareaAppComponent,
    ToggleAppComponent,
    VerificationCodeAppComponent,
  ],
})
export class ConfigModule {}

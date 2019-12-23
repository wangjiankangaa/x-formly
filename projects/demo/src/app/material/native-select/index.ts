import { AppComponent as NativeSelectAppComponent } from './app.component';

const NativeSelectExampleConfig = {
  title: 'NativeSelect type',
  component: NativeSelectAppComponent,
  type: 'NativeSelectAppComponent',
  debug: true,
  files: [
    {
      file: 'app.component.html',
      content: require('!!highlight-loader?raw=true&lang=html!./app.component.html'),

      filecontent: require('!!raw-loader!./app.component.html'),
    },
    {
      file: 'app.component.ts',
      content: require('!!highlight-loader?raw=true&lang=typescript!./app.component.ts'),
      filecontent: require('!!raw-loader!./app.component.ts'),
    },
    {
      file: 'app.module.ts',
      content: require('!!highlight-loader?raw=true&lang=typescript!../../app.module.ts'),
      filecontent: require('!!raw-loader!../stackblitz-app.module.ts'),
    },
  ],
};

export { NativeSelectAppComponent, NativeSelectExampleConfig };

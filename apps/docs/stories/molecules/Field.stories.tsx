import { Meta, StoryFn } from '@storybook/react';

import { Field } from 'ui';

export default {
  title: 'Molecules/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      name: 'Tag',
      control: 'select',
      defaultValue: 'input',
    },
    status: {
      name: 'Status',
      control: 'select',
    },
    label: { name: 'Label' },
    name: { name: 'Name' },
    value: { name: 'Value' },
    type: {
      name: 'Type',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
    },
    disabled: { name: 'Disabled', control: 'boolean' },
  },
} as Meta<typeof Field>;

const Template: StoryFn<typeof Field> = (args) => <Field {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default field',
  name: 'demoField',
};

export const Icon = Template.bind({});
Icon.args = {
  label: 'Icon field',
  name: 'demoField',
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  label: 'Email field',
  name: 'demoField',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'Password field',
  name: 'demoField',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Default field',
  name: 'demoField',
  value: 'test',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Default field',
  name: 'demoField',
  value: 'Value',
};

export const Status = Template.bind({});
Status.args = {
  label: 'Error field',
  name: 'demoField',
  status: 'danger',
};

export const Textarea = Template.bind({});
Textarea.args = {
  tag: 'textarea',
  label: 'Textarea field',
  name: 'demoField',
};

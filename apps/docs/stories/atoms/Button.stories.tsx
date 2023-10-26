import { Meta, StoryFn } from '@storybook/react';

import { Button } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    tag: {
      name: 'Tag or Component',
      control: { type: 'select' },
      options: ['button'], // override the default options
      mapping: ['button'], // override the default options
      labels: {
        // 'labels' maps option values to string labels
        a: 'a',
        button: 'button',
      },
    },
    icon: {
      name: 'Icon',
    },
    children: {
      name: 'Content',
      description: 'Children, the content specified between the tags',
    },
    variant: {
      name: 'Variants',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'text'],
    },
    size: {
      name: 'Size',
      control: { type: 'select' },
      options: ['small', 'regular'],
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
    },
    isLoading: {
      name: 'Loading',
      description: 'Override icon and content to show a loading spinner',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default = Template.bind({});
Default.args = {
  children: 'Manual',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Manual',
  variant: 'secondary',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Manual',
  disabled: true,
};

export const Small = Template.bind({});
Small.args = {
  children: 'Manual',
  size: 'small',
};

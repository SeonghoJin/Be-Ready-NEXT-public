import { Button, ButtonProps } from './Button';
import { Meta, Story } from '@storybook/react';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args: {}) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: <span>TEST</span>,
} as ButtonProps;

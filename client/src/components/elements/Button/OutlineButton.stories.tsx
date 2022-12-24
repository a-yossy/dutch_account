import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineButton } from 'src/components/elements/Button/OutlineButton';

export default {
  component: OutlineButton,
} as ComponentMeta<typeof OutlineButton>;

const Template: ComponentStory<typeof OutlineButton> = (args) => (
  <OutlineButton {...args}>ボタン</OutlineButton>
);

export const Default = Template.bind({});

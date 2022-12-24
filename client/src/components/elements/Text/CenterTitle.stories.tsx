import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CenterTitle } from 'src/components/elements/Text/CenterTitle';

export default {
  component: CenterTitle,
} as ComponentMeta<typeof CenterTitle>;

const Template: ComponentStory<typeof CenterTitle> = (args) => (
  <CenterTitle {...args}>タイトル</CenterTitle>
);

export const Default = Template.bind({});

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OneLineCard } from 'src/components/elements/Card/OneLineCard';

export default {
  component: OneLineCard,
} as ComponentMeta<typeof OneLineCard>;

const Template: ComponentStory<typeof OneLineCard> = (args) => (
  <OneLineCard {...args}>カード</OneLineCard>
);

export const Default = Template.bind({});
Default.args = {
  bg: 'blue.300',
  rounded: 'md',
  height: 12,
  width: 400,
  pl: 3,
};

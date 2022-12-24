import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OneLineCardLink } from 'src/components/elements/Card/OneLineCardLink';

export default {
  component: OneLineCardLink,
} as ComponentMeta<typeof OneLineCardLink>;

const Template: ComponentStory<typeof OneLineCardLink> = (args) => (
  <OneLineCardLink {...args}>カード</OneLineCardLink>
);

export const Default = Template.bind({});
Default.args = {
  href: '/example',
  bg: 'blue.300',
  rounded: 'md',
  height: 12,
  width: 400,
  pl: 3,
};

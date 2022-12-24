import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NoDecorationLink } from 'src/components/elements/Link/NoDecorationLink';

export default {
  component: NoDecorationLink,
} as ComponentMeta<typeof NoDecorationLink>;

const Template: ComponentStory<typeof NoDecorationLink> = (args) => (
  <NoDecorationLink {...args}>リンク</NoDecorationLink>
);

export const Default = Template.bind({});
Default.args = {
  href: '/example',
};

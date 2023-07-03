import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectField } from 'src/components/parts/Form/SelectField';

export default {
  component: SelectField,
} as ComponentMeta<typeof SelectField>;

const Template: ComponentStory<typeof SelectField> = (args) => (
  <SelectField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: undefined,
  id: 'name',
  formLabel: '名前',
  options: [
    { label: '選択してください', value: '' },
    { label: '太郎', value: '1' },
    { label: '次郎', value: '2' },
  ],
  width: 400,
};

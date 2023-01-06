import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UserSignUpForm } from 'src/features/users/components/UserSignUpForm';
import { signUpHandler } from 'src/test/server/handlers/signUp';

export default {
  component: UserSignUpForm,
  parameters: {
    msw: {
      handlers: [signUpHandler()],
    },
  },
} as ComponentMeta<typeof UserSignUpForm>;

const Template: ComponentStory<typeof UserSignUpForm> = () => (
  <UserSignUpForm />
);

export const Default = Template.bind({});

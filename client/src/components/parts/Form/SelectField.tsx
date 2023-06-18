import { FC, ReactNode } from 'react';
import {
  FieldWrapperPassThroughProps,
  FieldWrapper,
} from 'src/components/parts/Form/FieldWrapper';
import { Select, SelectProps } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { OmitStrict } from 'src/types/omitStrict';

type Option = {
  label: ReactNode;
  value: string;
};

type SelectFieldProps = OmitStrict<
  FieldWrapperPassThroughProps,
  'defaultValue'
> & {
  options: Option[];
  defaultValue?: SelectProps['defaultValue'];
  register: UseFormRegisterReturn;
};

export const SelectField: FC<SelectFieldProps> = ({
  error,
  id,
  formLabel,
  register,
  options,
  defaultValue,
  ...props
}) => (
  <FieldWrapper error={error} id={id} formLabel={formLabel} {...props}>
    <Select defaultValue={defaultValue} {...register}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </FieldWrapper>
);

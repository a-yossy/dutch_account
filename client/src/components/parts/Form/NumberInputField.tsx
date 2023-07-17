import { FC } from 'react';
import {
  FieldWrapper,
  FieldWrapperPassThroughProps,
} from 'src/components/parts/Form/FieldWrapper';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputProps,
  NumberInputStepper,
  NumberInputField as NextNumberInputField,
} from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { OmitStrict } from 'src/types/omitStrict';

type NumberInputFieldProps = OmitStrict<
  FieldWrapperPassThroughProps,
  'defaultValue'
> & {
  min?: NumberInputProps['min'];
  max?: NumberInputProps['max'];
  precision?: NumberInputProps['precision'];
  step?: NumberInputProps['step'];
  register: UseFormRegisterReturn;
  defaultValue?: NumberInputProps['defaultValue'];
};

export const NumberInputField: FC<NumberInputFieldProps> = ({
  error,
  id,
  formLabel,
  register,
  min,
  max,
  precision,
  step,
  defaultValue,
  ...props
}) => (
  <FieldWrapper error={error} id={id} formLabel={formLabel} {...props}>
    <NumberInput
      min={min}
      max={max}
      step={step}
      precision={precision}
      defaultValue={defaultValue}
    >
      <NextNumberInputField id={id} {...register} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FieldWrapper>
);

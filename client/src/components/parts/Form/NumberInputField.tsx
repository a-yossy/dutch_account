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

type NumberInputFieldProps = FieldWrapperPassThroughProps & {
  min: NumberInputProps['min'];
  max: NumberInputProps['max'];
  precision: NumberInputProps['precision'];
  step: NumberInputProps['step'];
  register: UseFormRegisterReturn;
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
  ...props
}) => (
  <FieldWrapper error={error} id={id} formLabel={formLabel} {...props}>
    <NumberInput min={min} max={max} step={step} precision={precision}>
      <NextNumberInputField {...register} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FieldWrapper>
);

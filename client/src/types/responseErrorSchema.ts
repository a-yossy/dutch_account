import { z } from 'zod';
import { ResponseError } from 'src/openapi-generator';

export const ResponseErrorSchema: z.ZodType<ResponseError> = z.object({
  messages: z.string().array().nonempty(),
});

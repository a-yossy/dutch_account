import { z } from 'zod';
import { ResponseError } from 'openapi-generator/api/model';

export const ResponseErrorSchema: z.ZodType<ResponseError> = z.object({
  messages: z.string().array().nonempty(),
});

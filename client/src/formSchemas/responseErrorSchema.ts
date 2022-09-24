import { z } from 'zod';
import { ResponseError } from 'openapi-generator/api/model';

const ResponseErrorSchema: z.ZodType<ResponseError> =
  z.object({
    messages: z.string().array().nonempty(),
  })
;

export default ResponseErrorSchema;

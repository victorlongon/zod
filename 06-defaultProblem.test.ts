import { expect, it } from 'vitest';
import { z } from 'zod';

const Form = z.object({
  repoName: z.string(),
  // default includes optional()
  keywords: z.array(z.string()).default([]),
  //
});

export const validateFormInput = (values: unknown) => {
  const parsedData = Form.parse(values);

  return parsedData;
};

// when the input is different from the output, you need to use z.input and z.output
type FormInput = z.input<typeof Form>;
type FormOutput = z.output<typeof Form>;

it('Should include keywords if passed', async () => {
  const result = validateFormInput({
    repoName: 'mattpocock',
    keywords: ['123'],
  });

  expect(result.keywords).toEqual(['123']);
});

it('Should automatically add keywords if none are passed', async () => {
  const result = validateFormInput({
    repoName: 'mattpocock',
  });

  expect(result.keywords).toEqual([]);
});

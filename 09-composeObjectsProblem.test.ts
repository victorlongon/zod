import { z } from 'zod';

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;

export type Expect<T extends true> = T;

//BEFORE
// const User = z.object({
//   id: z.string().uuid(),
//   name: z.string(),
// });

// const Post = z.object({
//   id: z.string().uuid(),
//   title: z.string(),
//   body: z.string(),
// });

// const Comment = z.object({
//   id: z.string().uuid(),
//   text: z.string(),
// });

//AFTER

// another possible way is to use `merge` see https://github.com/colinhacks/zod#merge
const Node = z.object({
  id: z.string().uuid(),
});

const User = Node.extend({
  name: z.string(),
});

const Post = Node.extend({
  title: z.string(),
  body: z.string(),
});

const Comment = Node.extend({
  text: z.string(),
});

type cases = [
  Expect<Equals<z.infer<typeof Comment>, { id: string; text: string }>>,
  Expect<
    Equals<z.infer<typeof Post>, { id: string; title: string; body: string }>
  >,
  Expect<Equals<z.infer<typeof User>, { id: string; name: string }>>
];

import { z } from 'zod';
import fetch from 'node-fetch';

// the transform method is a way to transform the data after it has been parsed
// see https://github.com/colinhacks/zod#transform
const StarWarsPerson = z
  .object({
    name: z.string(),
  })
  .transform(person => ({
    ...person,
    nameAsArray: person.name.split(' '),
  }));

const StarWarsPeopleResults = z.object({
  results: z.array(StarWarsPerson),
});

export const fetchStarWarsPeople = async () => {
  const data = await fetch(
    'https://www.totaltypescript.com/swapi/people.json'
  ).then(res => res.json());

  const parsedData = StarWarsPeopleResults.parse(data);

  return parsedData.results;
};

it('Should resolve the name and nameAsArray', async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: 'Luke Skywalker',
    nameAsArray: ['Luke', 'Skywalker'],
  });
});

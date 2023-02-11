import { z } from 'zod';
import fetch from 'node-fetch';

const StarWarsPerson = z.object({
  name: z.string(),
});

const StarWarsPeople = z.object({
  results: z.array(StarWarsPerson),
});

const fetchStarWarsPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people');
  const data = await response.json();
  const parsedData = StarWarsPeople.parse(data);

  return parsedData.results;
};

it('Should return the name', async () => {
  expect((await fetchStarWarsPeople())[0]).toEqual({
    name: 'Luke Skywalker',
  });
});

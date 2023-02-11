import { z } from 'zod';
import fetch from 'node-fetch';

const PersonResult = z.object({
  name: z.string(),
});

const fetchStarWarsPerson = async (id: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  const data = await response.json();
  const parsedData = PersonResult.parse(data);

  return parsedData.name;
};

it('should return the name of the person', async () => {
  expect(await fetchStarWarsPerson('1')).toBe('Luke Skywalker');
  expect(await fetchStarWarsPerson('2')).toBe('C-3PO');
});

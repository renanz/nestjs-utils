import { Greeter } from '../';

test('Greeter Method', () => {
  expect(Greeter('Someone')).toBe('Hello Someone');
});

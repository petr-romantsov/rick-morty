import { describe, expect, it } from 'vitest';

import { classnames } from './classnames';

describe('classnames', () => {
  it('should return a string', () => {
    const className = 'test';
    const expected = 'test';

    const result = classnames(className);

    expect(result).toBe(expected);
  });

  it('should reaturn a astring with multiole classes', () => {
    const className = 'test';
    const className2 = 'test2';
    const className3 = 'test3';
    const expected = 'test test2 test3';

    const result = classnames(className, className2, className3);

    expect(result).toBe(expected);
  });

  it('should ignore falsy values', () => {
    const className = 'test';
    const className2 = 'test2';
    const expected = 'test test2';

    const result = classnames(className, null, undefined, false, 0, className2);

    expect(result).toBe(expected);
  });

  it('should return an empty string if no arguments are passed', () => {
    const expected = '';

    const result = classnames();

    expect(result).toBe(expected);
  });

  describe('objects', () => {
    it('should include keys with truthy values', () => {
      const modifiers = { a: true, b: false };
      const expected = 'a';

      const result = classnames(modifiers);

      expect(result).toBe(expected);
    });

    it('should keep object key order', () => {
      const modifiers = { foo: true, bar: true };
      const expected = 'foo bar';

      const result = classnames(modifiers);

      expect(result).toBe(expected);
    });

    it('should skip falsy object values', () => {
      const modifiers = {
        a: false,
        b: 0,
        c: '',
        d: null,
        e: undefined,
        f: NaN
      };
      const expected = '';

      const result = classnames(modifiers);

      expect(result).toBe(expected);
    });

    it('should include keys for truthy non-boolean values', () => {
      const modifiers = {
        a: true,
        b: 1,
        c: 'x',
        d: [],
        e: {}
      };
      const expected = 'a b c d e';

      const result = classnames(modifiers);

      expect(result).toBe(expected);
    });

    it('should return an empty string for an empty object', () => {
      const modifiers = {};
      const expected = '';

      const result = classnames(modifiers);

      expect(result).toBe(expected);
    });

    it('should combine a string with a modifiers object', () => {
      const className = 'status';
      const modifiers = {
        status_alive: true,
        status_dead: false
      };
      const expected = 'status status_alive';

      const result = classnames(className, modifiers);

      expect(result).toBe(expected);
    });
  });

  describe('arrays', () => {
    it('should flatten a flat array', () => {
      const classList = ['a', 'b'];
      const expected = 'a b';

      const result = classnames(classList);

      expect(result).toBe(expected);
    });

    it('should flatten nested arrays', () => {
      const classList = ['a', ['b', ['c']]];
      const expected = 'a b c';

      const result = classnames(classList);

      expect(result).toBe(expected);
    });

    it('should ignore falsy values inside arrays', () => {
      const classList = ['a', null, 'b'];
      const expected = 'a b';

      const result = classnames(classList);

      expect(result).toBe(expected);
    });

    it('should handle arrays of objects', () => {
      const classList = [{ a: true }, { b: false, c: true }];
      const expected = 'a c';

      const result = classnames(classList);

      expect(result).toBe(expected);
    });

    it('should return an empty string for an empty array', () => {
      const classList: string[] = [];
      const expected = '';

      const result = classnames(classList);

      expect(result).toBe(expected);
    });
  });

  describe('mixed arguments', () => {
    it('should combine string, object and array', () => {
      const className = 'btn';
      const modifiers = { active: true };
      const classList = ['lg', false];
      const expected = 'btn active lg';

      const result = classnames(className, modifiers, classList);

      expect(result).toBe(expected);
    });

    it('should combine several objects', () => {
      const modifiers = { a: true };
      const extraModifiers = { b: true };
      const expected = 'a b';

      const result = classnames(modifiers, extraModifiers);

      expect(result).toBe(expected);
    });
  });

  describe('string edge cases', () => {
    it('should drop empty strings', () => {
      const emptyClassName = '';
      const className = 'a';
      const expected = 'a';

      const result = classnames(emptyClassName, className);

      expect(result).toBe(expected);
    });

    it('should keep whitespace-only strings', () => {
      const className = '  ';
      const expected = '  ';

      const result = classnames(className);

      expect(result).toBe(expected);
    });

    it('should not deduplicate class names', () => {
      const className = 'a';
      const expected = 'a a';

      const result = classnames(className, className);

      expect(result).toBe(expected);
    });

    it('should keep a class name that already contains a space', () => {
      const className = 'foo bar';
      const expected = 'foo bar';

      const result = classnames(className);

      expect(result).toBe(expected);
    });
  });

  describe('numbers and booleans as arguments', () => {
    it('should ignore numbers passed as arguments', () => {
      const first = 1;
      const second = 2;
      const expected = '';

      const result = classnames(first, second);

      expect(result).toBe(expected);
    });

    it('should ignore true passed as an argument', () => {
      const flag = true;
      const expected = '';

      const result = classnames(flag);

      expect(result).toBe(expected);
    });

    it('should keep strings and ignore nearby numbers and true', () => {
      const className = 'a';
      const flag = true;
      const count = 1;
      const expected = 'a';

      const result = classnames(className, flag, count);

      expect(result).toBe(expected);
    });
  });
});

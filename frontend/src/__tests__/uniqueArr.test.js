import uniqueArr from '../utils/uniqueArr.js';

describe('uniqueArr.js', () => {
  test('중복 제거 확인 number', () => {
    expect(uniqueArr([0,1,1])).toStrictEqual([0,1]);
  });

  test('중복 제거 확인 string', () => {
    expect(uniqueArr(['a','b','c','b'])).toStrictEqual(['a','b','c']);
  });
});
/* eslint no-use-before-define: 0 */
const { validateEmail, validateLength, UpperCaseLetter } = require('./Inputs');

test('validation email when email is correct ', () => {
    let email = 'mykolas@gmail.com';
    expect(validateEmail(email)).toBeTruthy();
});
test('validation email when email is incorrect ', () => {
    let email = 'mykolasgmail.com';
    expect(validateEmail(email)).toBe(false);
});
test('Uppercase function', () => {
    let toUpper = 'test';
    expect(UpperCaseLetter(toUpper)).toBe('Test');
});
test('Validate length function testing', () => {
    let min = 3;
    let max = 17;
    let input = 'jest testing';
    console.log(input.length);
    let name = 'Jest';

    expect(validateLength(min, max, input, name)).toStrictEqual([]);

    let newInput = 'no';
    expect(validateLength(min, max, newInput, name)).toStrictEqual([
        'Jest must be longer then 2 characters'
    ]);

    newInput = 'This wont work because it is to long';
    expect(validateLength(min, max, newInput, name)).toStrictEqual([
        'Jest must be shorter then 16 characters'
    ]);
});

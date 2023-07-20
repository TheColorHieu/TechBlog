const { test } = require('node:test');
const {format_date} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2023-07-20 16:12:03');
    expect(format_date(date)).toBe('7/20/2023');
});
const { GetUsers } = require('./userService');

it('Get users by page', async () => {
    let { data: users } = await GetUsers(1);
    expect(users.length).toBeGreaterThan(0);
});

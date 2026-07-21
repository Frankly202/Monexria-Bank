const userController = require('../../src/controllers/userController');
const { mockReq, mockRes } = require('../helpers');

describe('getProfile', () => {
  test('returns the authenticated user id from req.userId with profile fields', async () => {
    const req = mockReq({ userId: 'user-77' });
    const res = mockRes();

    await userController.getProfile(req, res);

    expect(res.body.id).toBe('user-77');
    expect(res.body).toMatchObject({ email: 'user@example.com', firstName: 'John', lastName: 'Doe' });
  });
});

describe('updateProfile', () => {
  test('confirms the profile was updated', async () => {
    const res = mockRes();
    await userController.updateProfile(mockReq(), res);
    expect(res.body).toEqual({ message: 'Profile updated successfully' });
  });
});

describe('getSettings', () => {
  test('returns default user settings', async () => {
    const res = mockRes();
    await userController.getSettings(mockReq(), res);

    expect(res.body).toEqual({
      notifications: true,
      emailAlerts: true,
      twoFactorAuth: false,
      currency: 'USD',
    });
  });
});

describe('updateSettings', () => {
  test('confirms settings were updated', async () => {
    const res = mockRes();
    await userController.updateSettings(mockReq(), res);
    expect(res.body).toEqual({ message: 'Settings updated successfully' });
  });
});

describe('changePassword', () => {
  test('confirms the password was changed', async () => {
    const res = mockRes();
    await userController.changePassword(mockReq(), res);
    expect(res.body).toEqual({ message: 'Password changed successfully' });
  });
});

describe('enable2FA', () => {
  test('confirms 2FA enablement and returns a secret', async () => {
    const res = mockRes();
    await userController.enable2FA(mockReq(), res);
    expect(res.body).toEqual({ message: '2FA enabled successfully', secret: 'secret_code' });
  });
});

describe('disable2FA', () => {
  test('confirms 2FA was disabled', async () => {
    const res = mockRes();
    await userController.disable2FA(mockReq(), res);
    expect(res.body).toEqual({ message: '2FA disabled successfully' });
  });
});

describe('getNotifications', () => {
  test('returns notification entries', async () => {
    const res = mockRes();
    await userController.getNotifications(mockReq(), res);

    expect(res.body.notifications).toHaveLength(2);
    expect(res.body.notifications[0]).toHaveProperty('message');
  });
});

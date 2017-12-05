var UserHelper = {};

UserHelper.UserPath = () => '/user';
UserHelper.UserPath = id => `/user/${id}`;
UserHelper.newUserPath = id => `/user/new`;
UserHelper.editUserPath = id => `/user/${id}/edit`;
UserHelper.destroyUserPath = id => `/user/${id}?_method=delete`;

module.exports = UserHelper;

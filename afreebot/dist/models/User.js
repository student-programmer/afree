"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
// Перечисление ролей пользователя
var UserRole;
(function (UserRole) {
    UserRole["OWNER"] = "owner";
    UserRole["ADMIN"] = "admin";
    UserRole["MODERATOR"] = "moderator";
    UserRole["CLIENT"] = "client";
})(UserRole || (exports.UserRole = UserRole = {}));

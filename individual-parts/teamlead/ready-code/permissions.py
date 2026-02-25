from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """Доступ только для администраторов."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == 'admin'
        )


class IsAdminOrHrManager(BasePermission):
    """Доступ для администраторов и менеджеров по персоналу."""

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role in ('admin', 'hr_manager')
        )

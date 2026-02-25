from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import (
    User, Organization, Department, Position,
    Employee, File, HrOperation, ChangeHistory,
)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'last_name', 'first_name', 'role', 'is_active')
    list_filter = ('role', 'is_active', 'deleted_at')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Дополнительно', {'fields': ('middle_name', 'role', 'deleted_at')}),
    )


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'comment', 'deleted_at')
    search_fields = ('name',)


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'organization', 'parent', 'deleted_at')
    list_filter = ('organization',)
    search_fields = ('name',)


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ('name', 'deleted_at')
    search_fields = ('name',)


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'middle_name', 'birth_date', 'deleted_at')
    search_fields = ('last_name', 'first_name')


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('title', 'employee', 'uploaded_at', 'deleted_at')


@admin.register(HrOperation)
class HrOperationAdmin(admin.ModelAdmin):
    list_display = ('employee', 'operation_type', 'department', 'position', 'salary', 'effective_date')
    list_filter = ('operation_type',)


@admin.register(ChangeHistory)
class ChangeHistoryAdmin(admin.ModelAdmin):
    list_display = ('date', 'user', 'object_type', 'object_id')
    list_filter = ('object_type',)

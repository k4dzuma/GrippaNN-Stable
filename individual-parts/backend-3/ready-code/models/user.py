from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Пользователь системы с ролевой моделью."""

    class Role(models.TextChoices):
        ADMIN = 'admin', 'Администратор'
        HR_MANAGER = 'hr_manager', 'Менеджер по персоналу'

    middle_name = models.CharField('Отчество', max_length=150, blank=True, default='')
    role = models.CharField(
        'Роль',
        max_length=20,
        choices=Role.choices,
        default=Role.HR_MANAGER,
    )
    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f'{self.last_name} {self.first_name} ({self.username})'

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN

    @property
    def is_hr_manager(self):
        return self.role == self.Role.HR_MANAGER

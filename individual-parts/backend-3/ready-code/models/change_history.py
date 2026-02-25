from django.db import models
from django.conf import settings


class ChangeHistory(models.Model):
    """История изменений."""

    class ObjectType(models.TextChoices):
        ORGANIZATION = 'organization', 'Организация'
        DEPARTMENT = 'department', 'Отдел'
        POSITION = 'position', 'Должность'
        EMPLOYEE = 'employee', 'Сотрудник'
        HR_OPERATION = 'hr_operation', 'Кадровая операция'

    date = models.DateTimeField('Дата и время', auto_now_add=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='change_history',
        verbose_name='Кто изменил',
    )
    object_type = models.CharField(
        'Тип объекта',
        max_length=20,
        choices=ObjectType.choices,
    )
    object_id = models.PositiveIntegerField('ID объекта')
    changed_fields = models.JSONField('Изменённые поля', default=list)
    old_values = models.JSONField('Старые значения', default=dict)
    new_values = models.JSONField('Новые значения', default=dict)

    class Meta:
        db_table = 'change_history'
        verbose_name = 'Запись истории'
        verbose_name_plural = 'История изменений'
        ordering = ['-date']

    def __str__(self):
        return f'{self.get_object_type_display()} #{self.object_id} — {self.date:%d.%m.%Y %H:%M}'

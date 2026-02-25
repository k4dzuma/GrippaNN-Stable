from django.db import models


class Department(models.Model):
    """Отдел (допускается вложенная структура)."""

    organization = models.ForeignKey(
        'core.Organization',
        on_delete=models.CASCADE,
        related_name='departments',
        verbose_name='Организация',
    )
    name = models.CharField('Наименование', max_length=255)
    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children',
        verbose_name='Родительский отдел',
    )
    comment = models.TextField('Комментарий', blank=True, default='')
    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'departments'
        verbose_name = 'Отдел'
        verbose_name_plural = 'Отделы'
        ordering = ['name']

    def __str__(self):
        return f'{self.name} ({self.organization.name})'

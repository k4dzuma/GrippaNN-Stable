from django.db import models


class Position(models.Model):
    """Должность."""

    name = models.CharField('Наименование', max_length=255)
    comment = models.TextField('Комментарий', blank=True, default='')
    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'positions'
        verbose_name = 'Должность'
        verbose_name_plural = 'Должности'
        ordering = ['name']

    def __str__(self):
        return self.name

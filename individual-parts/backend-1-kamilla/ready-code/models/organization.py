from django.db import models


class Organization(models.Model):
    """Организация."""

    name = models.CharField('Наименование', max_length=255)
    comment = models.TextField('Комментарий', blank=True, default='')
    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'organizations'
        verbose_name = 'Организация'
        verbose_name_plural = 'Организации'
        ordering = ['name']

    def __str__(self):
        return self.name

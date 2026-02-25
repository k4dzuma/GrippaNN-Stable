from django.db import models


class File(models.Model):
    """Файл (скан паспорта и другие документы сотрудника)."""

    employee = models.ForeignKey(
        'core.Employee',
        on_delete=models.CASCADE,
        related_name='files',
        verbose_name='Сотрудник',
    )
    title = models.CharField('Название', max_length=255)
    file = models.FileField('Файл', upload_to='employee_files/%Y/%m/')
    uploaded_at = models.DateTimeField('Дата загрузки', auto_now_add=True)
    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'files'
        verbose_name = 'Файл'
        verbose_name_plural = 'Файлы'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f'{self.title} — {self.employee}'

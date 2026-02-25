from django.db import models


class Employee(models.Model):
    """Сотрудник."""

    last_name = models.CharField('Фамилия', max_length=150)
    first_name = models.CharField('Имя', max_length=150)
    middle_name = models.CharField('Отчество', max_length=150, blank=True, default='')
    birth_date = models.DateField('Дата рождения', null=True, blank=True)

    # Паспортные данные
    passport_series = models.CharField('Серия паспорта', max_length=10, blank=True, default='')
    passport_number = models.CharField('Номер паспорта', max_length=10, blank=True, default='')
    passport_issue_date = models.DateField('Дата выдачи', null=True, blank=True)
    passport_issued_by = models.CharField('Кем выдан', max_length=255, blank=True, default='')
    passport_code = models.CharField('Код подразделения', max_length=20, blank=True, default='')

    # Адрес регистрации
    address_region = models.CharField('Область', max_length=255, blank=True, default='')
    address_city = models.CharField('Населённый пункт', max_length=255, blank=True, default='')
    address_street = models.CharField('Улица', max_length=255, blank=True, default='')
    address_house = models.CharField('Дом', max_length=20, blank=True, default='')
    address_building = models.CharField('Корпус', max_length=20, blank=True, default='')
    address_flat = models.CharField('Квартира', max_length=20, blank=True, default='')

    deleted_at = models.DateTimeField('Дата удаления', null=True, blank=True)

    class Meta:
        db_table = 'employees'
        verbose_name = 'Сотрудник'
        verbose_name_plural = 'Сотрудники'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f'{self.last_name} {self.first_name} {self.middle_name}'.strip()

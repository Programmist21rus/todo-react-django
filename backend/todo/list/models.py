from django.db import models


class Author(models.Model):
    name = models.CharField(verbose_name="Имя", max_length=50)
    age = models.IntegerField(verbose_name="Возраст")
    is_student = models.BooleanField(default="True")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"


class Record(models.Model):
    title = models.CharField(verbose_name="Заголовок", max_length=200)
    content = models.TextField(verbose_name="Контент", max_length=5000)
    record = models.ForeignKey('Author', on_delete=models.CASCADE)
    tag_record = models.ForeignKey("Tag_record", on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Запись"
        verbose_name_plural = "Записи"


class Tag_record(models.Model):
    title = models.CharField(verbose_name="Заголовок", max_length=100)
    content = models.TextField(verbose_name="Контент", max_length=3000)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Тег записи"
        verbose_name_plural = "Теги записи"

from django.contrib import admin
from diary.models import TestResult, ColorResult, Mention

# Register your models here.
class TestAdmin(admin.ModelAdmin):
    list_display = ['feeling']
admin.site.register(TestResult, TestAdmin)

class ColorResultAdmin(admin.ModelAdmin):
    list_display = ['user']
admin.site.register(ColorResult, ColorResultAdmin)
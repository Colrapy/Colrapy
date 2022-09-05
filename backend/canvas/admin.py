from django.contrib import admin
from canvas.models import Template, Color

# Register your models here.
class ColorAdmin(admin.ModelAdmin):
    list_display = ['color']
admin.site.register(Color, ColorAdmin)

class TemplateAdmin(admin.ModelAdmin):
    list_display = ['color']
admin.site.register(Template, TemplateAdmin)
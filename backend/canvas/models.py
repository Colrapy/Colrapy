from django.db import models
from users.models import User

# Create your models here.
class Color(models.Model) :
    color = models.CharField(max_length = 10, default = None, primary_key = True)
    code = models.CharField(max_length = 15, default = None)
    negative = models.CharField(max_length = 300, default = None, null = True, blank = True)
    positive = models.CharField(max_length = 300, default = None, null = True, blank = True)

class Template(models.Model) :
    color = models.ForeignKey(Color, on_delete = models.SET_NULL, null = True)
    base_img = models.ImageField(upload_to = 'canvas/base/', default = 'default.png', null = True, blank = True)
    line_img = models.ImageField(upload_to = 'canvas/line/', default = 'default.png', null = True, blank = True)
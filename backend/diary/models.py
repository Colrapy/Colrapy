from django.db import models
from django.conf import settings
from users.models import User
from canvas.models import Color
#from user.models import User
from django.core.validators import MinLengthValidator


# Create your models here.
class TestResult(models.Model) :
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    activity = models.CharField(max_length = 20, default = None)
    feeling = models.CharField(validators=[MinLengthValidator(30)], max_length = 300,
                help_text = 'Describe in detail how you felt today')
    pub_date = models.DateTimeField('tested date', auto_now_add = True)


class ColorResult(models.Model) :
    user = models.ForeignKey(User, on_delete = models.SET_NULL, null = True)
    color1 = models.ForeignKey(Color, on_delete = models.SET_NULL, null = True, related_name = 'color1_info')
    color2 = models.ForeignKey(Color, on_delete = models.SET_NULL, null = True, related_name = 'color2_info')
    color3 = models.ForeignKey(Color, on_delete = models.SET_NULL, null = True, related_name = 'color3_info')
    emotion = models.IntegerField(default = 0)
    prediction = models.IntegerField(default = 0)
    mention = models.CharField(max_length = 300, default = None)
    b_image1 = models.ImageField(upload_to = 'diary/', default = 'default.png')
    b_image2 = models.ImageField(upload_to = 'diary/', default = 'default.png')
    b_image3 = models.ImageField(upload_to = 'diary/', default = 'default.png')
    l_image1 = models.ImageField(upload_to = 'diary/', default = 'default.png')
    l_image2 = models.ImageField(upload_to = 'diary/', default = 'default.png')
    l_image3 = models.ImageField(upload_to = 'diary/', default = 'default.png')
    pub_date = models.DateField('tested date', auto_now_add = True)
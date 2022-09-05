from users.models import User
from diary.models import TestResult, ColorResult, Mention
#from diary.views import get_prediction()
from canvas.models import Template, Color
# 시리얼라이저
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from django.conf import settings

# 다이어리 작성 시리얼라이저
class WriteSerializer(serializers.ModelSerializer) :
    class Meta :
        model = TestResult
        fields = ('activity', 'feeling')

# ResultSerilizer의 base_img 정보 묶기
class BaseImageSerializer(serializers.Serializer) :
    base_image1 = serializers.ImageField(source = "b_image1")
    base_image2 = serializers.ImageField(source = "b_image2")
    base_image3 = serializers.ImageField(source = "b_image3")

    # image 파일의 경로 얻어오기
    def get_photo_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.fingerprint.url
        return request.build_absolute_uri(photo_url)

# ResultSerilizer의 line_img 정보 묶기
class LineImageSerializer(serializers.Serializer) :
    line_image1 = serializers.ImageField(source = "l_image1")
    line_image2 = serializers.ImageField(source = "l_image2")
    line_image3 = serializers.ImageField(source = "l_image3")

    # image 파일의 경로 얻어오기
    def get_photo_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.fingerprint.url
        return request.build_absolute_uri(photo_url)


# ResultSerilizer의 color 외래키 정보 얻기
class ColorSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Color
        fields = ('color', 'code', 'negative', 'positive')


class ResultSerializer(serializers.ModelSerializer) :
    # Foriegn Key의 정보 얻어오기
    color1 = ColorSerializer(read_only=True)
    color2 = ColorSerializer(read_only=True)
    color3 = ColorSerializer(read_only=True)

    base_images = BaseImageSerializer(source = "*")
    line_images = LineImageSerializer(source = "*")

    class Meta :
        model = ColorResult
        fields = ['prediction',
                  'mention',
                  'color1',
                  'color2',
                  'color3',
                  'base_images',
                  'line_images'
                 ]


# 랜덤 이미지 선정
class ImageSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Template
        fields = ('base_img', 'line_img')

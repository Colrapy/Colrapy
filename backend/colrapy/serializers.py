from users.models import User
# 시리얼라이저
from rest_framework import serializers
from django.conf import settings

# 로그인 후 메인화면 시리얼라이저
class MainSerializer(serializers.ModelSerializer) :
    class Meta :
        model = User
        fields = ('username', 'email')
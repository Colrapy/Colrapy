from django.conf import settings
from users.models import User
# Django 기본 비밀번호 검증 도구
from django.contrib.auth.password_validation import validate_password
# 시리얼라이저
from rest_framework import serializers
# 토큰 모델
from rest_framework.authtoken.models import Token
# 이메일 중복 방지
from rest_framework.validators import UniqueValidator
# 기본 인증 도구
from django.contrib.auth import authenticate
# 데이터 가져오기
from rest_framework.generics import get_object_or_404

# 로그인
class LoginSerializer(serializers.Serializer) :
    email = serializers.EmailField(required = True)
    password = serializers.CharField(required = True, write_only = True)

    # 토큰 반환
    def validate(self, data) :
        user = authenticate(**data)
        if user :
            token = Token.objects.get(user = user)
            return token
        raise serializers.ValidationError(
            {"error" : "Unable to log in with provided credentials."})

# 프로필/비밀번호 변경
class ProfileSerializer(serializers.ModelSerializer) :
    username = serializers.CharField()
    password = serializers.CharField(
        write_only = True,
        required = True,
        # 비밀번호 검증
        validators = [validate_password],
    )
    age = serializers.CharField()
    
    class Meta :
        model = User
        fields = ('username', 'password', 'age')
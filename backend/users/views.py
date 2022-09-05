import os
import json
from django.views import View
from rest_framework import generics, status
from rest_framework.response import Response
from django.http import HttpResponseRedirect

from users.models import User
from users.serializers import LoginSerializer, ProfileSerializer

# 소셜 로그인
import requests
from django.conf import settings
#from allauth.socialaccount.models import socialaccount
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.kakao import views as kakao_views
from allauth.socialaccount.providers.naver import views as naver_views
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# 토큰 모델
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
# 데이터 가져오기
from rest_framework.generics import get_object_or_404
from django.conf import settings

# Create your views here.

# 로그인
class LoginView(generics.GenericAPIView) :
    serializer_class = LoginSerializer

    def post(self, request) :
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        # validate()의 리턴값인 token을 받아옴
        token = serializer.validated_data
        return Response({"token" : token.key}, status = status.HTTP_200_OK, headers = {"token" : token.key})
        #, headers = {"Token" : token.key}


# 프로필 변경
class ProfileView(generics.UpdateAPIView) :
    #def put(self, request, email, *args, **kwargs) :
    def put(self, request):
        serializer = ProfileSerializer(data = request.data)

        if serializer.is_valid(raise_exception = True) :

            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            age = serializer.validated_data['age']

            user = User.objects.get(email = self.request.user)
            user.set_password(password)
            user.save()

            User.objects.filter(email = self.request.user).update(
                username = username,
                age = age,
            )

            return Response('프로필 변경완료', status=status.HTTP_200_OK)


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
with open(os.path.join(BASE_DIR, 'colrapy\secrets.json'), 'rb') as secret_file :
    secrets = json.load(secret_file)


# 카카오 로그인(token)
class KakaoCallbackView(View) :

    def get(self, request) :

        try :
            code = request.GET.get("code")
            client_id = secrets['KAKAO']["REST_API_KEY"]
            redirect_uri = secrets['KAKAO']["MAIN_DOMAIN"] + "/users/login/kakao/callback"

            token_request = requests.get(
                f"https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id={client_id}&redirect_uri={redirect_uri}&code={code}"
            )
            token_json = token_request.json()

            error = token_json.get("error", None)
            if error is not None :
                return JsonResponse({"message" : "INVALID_CODE"}, status = 400)

            access_token = token_json.get("access_token")

            profile_request = requests.get(
                "https://kapi.kakao.com/v2/user/me", headers={"Authorization" : f"Bearer {access_token}"},
            )
            profile_json = profile_request.json()

            kakao_account = profile_json.get("kakao_account")
            email = kakao_account.get("email", None)

            profile = kakao_account.get("profile")
            nickname = profile.get("nickname")
        
        except KeyError :
            return JsonResponse({"message" : "INVALID_TOKEN"}, status = 400)

        if User.objects.filter(email = email).exists() :

            # 계정 존재 시 Login 페이지로 이동
            return HttpResponseRedirect("http://127.0.0.1:3000/users/login")
        
        else :
            tem_email = email.split('@')
            user = User.objects.create_user(
                                            username = nickname,
                                            email = email,
                                            # 초기 비밀번호 임의 설정
                                            password = tem_email[0] + "0000",
                                            # 초기 나이 임의 설정
                                            age = 0,
                                        )
            user.save()

            # 토큰 생성
            token = Token.objects.create(user=user)
            
            # 계정 생성 완료 시 Login 페이지로 이동
            return HttpResponseRedirect("http://127.0.0.1:3000/users/login")


# 네이버 로그인(token)
class NaverCallbackView(View) :

    def get(self, request) :

        try :
            code = request.GET.get("code")
            client_id = secrets['NAVER']["CLIENT_ID"]
            client_secret = secrets['NAVER']["SECRET"]
            user_token = request.GET.get("code")
            state = request.GET.get("state", "")

            # post request
            token_request = requests.get(
                f"https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&code={code}&state={state}"
            )
            token_json = token_request.json()

            error = token_json.get("error", None)
            # 에러가 존재하면
            if error is not None :
                return JsonResponse({"message" : "INVALID_CODE"}, status = 400)
            
            access_token = token_json.get("access_token")

            # post request
            profile_request = requests.post(
                "https://openapi.naver.com/v1/nid/me",
                headers={"Authorization": f"Bearer {access_token}"},
            )
            profile_json = profile_request.json()
            #.decode('utf-8')

            # parsing profile json
            naver_account = profile_json.get("response")
            email = naver_account.get("email")
            nickname = naver_account.get("nickname")

        except KeyError :
            return JsonResponse({"message" : "INVALID_TOKEN"}, status = 400)

        if User.objects.filter(email = email).exists() :

            # 계정 존재 시 Login 페이지로 이동
            return HttpResponseRedirect("http://127.0.0.1:3000/users/login")

        else :
            tem_email = email.split('@')
            user = User.objects.create_user(
                                            username = nickname,
                                            email = email,
                                            # 초기 비밀번호 임의 설정
                                            password = tem_email[0] + "0000",
                                            # 초기 나이 임의 설정
                                            age = 0,
                                        )
            user.save()

            # 토큰 생성
            token = Token.objects.create(user=user)

            # 계정 생성 완료 시 Login 페이지로 이동
            return HttpResponseRedirect("http://127.0.0.1:3000/users/login")
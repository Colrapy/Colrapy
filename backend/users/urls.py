from django.urls import path
from django.conf import settings

from users.views importLoginView, ProfileView
from users.views import KakaoCallbackView, NaverCallbackView

urlpatterns = [
    # 로그인
    path('login/', LoginView.as_view()),
    # 프로필
    path('profile/', ProfileView.as_view()),
    # 카카오 콜백
    path('login/kakao/callback', KakaoCallbackView.as_view(), name = 'kakao_callback'),
    # 네이버 콜백
    path('login/naver/callback/', NaverCallbackView.as_view(), name = 'naver_callback'),
]
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from diary.views import WriteView, ResultAPIView, AIResultView
from rest_framework import routers


urlpatterns = [
    # 다이어리 작성
    path('', WriteView.as_view()),
    # 인공지능
    path('loading/', AIResultView.as_view()),
    # 결과 확인
    path('result/', ResultAPIView.as_view()),
]
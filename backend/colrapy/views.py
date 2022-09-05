from rest_framework.response import Response
from rest_framework import generics, status

from users.models import User
from django.conf import settings
from rest_framework.views import APIView
from colrapy.serializers import MainSerializer

class MainAPIView(APIView) :
    # 회원 정보 반환
    def get(self, reqeust) :
        user = User.objects.get(email = self.request.user)
        serializer = MainSerializer(user)
        return Response(serializer.data, status = status.HTTP_200_OK)
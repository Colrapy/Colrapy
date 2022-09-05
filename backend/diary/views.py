# 필요 table 불러오기
from users.models import User
from diary.models import TestResult, ColorResult
from canvas.models import color

from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response

# 사용 view 세팅
from django.views import View
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404

# 시리얼라이저
from diary.serializers import WriteSerializer, ResultSerializer, ImageSerializer

# 인공지능
import os
import random
from django.apps import AppConfig
from canvas.models import Template
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# prediction
from diary.text_analysis import find_prediction
# emotion
from diary.KoBERT_master.test import predict


# Create your views here.
# 다이어리 작성
class WriteView(generics.GenericAPIView) :
    serializer_class = WriteSerializer
    
    def post(self, request) :
        # front에서 데이터 받아오기
        serializer = self.get_serializer(data = request.data)

        if serializer.is_valid() :

            # 받아온 데이터 저장
            serializer.save(user = self.request.user)
            return Response(data = serializer.data, status = status.HTTP_201_CREATED)

        else :

            return Response(data= serializer.errors, status = status.HTTP_400_BAD_REQUEST)


# 랜덤 이미지 선정
def pick_random_object():
    return random.randrange(1, Template.objects.all().count() + 1)

# 인공지능
class AIResultView(APIView) :

    def get(self, request) :

        # 로그인한 사용자의 최근 다이어리 불러오기
        user = User.objects.get(email = self.request.user)
        data = TestResult.objects.filter(user = user).latest('pub_date')

        # 다이어리의 feeling 얻기
        serializer = WriteSerializer(data)
        feeling = serializer.data['feeling']

        # 인공지능 함수
        prediction = find_prediction(feeling)
        emotion = predict(feeling)
            
        color = ["빨간색", "주황색", "노란색", "연두색", "초록색", "청록색", "파란색", "남색", "보라색", "마젠타색"]

        # emotion과 prediction에 따른 color 지정
        if emotion == 3 and prediction == 0: #빨강
            recommend_color = color[0:2]
            recommend_color.append(color[-1])
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif emotion == 3 and prediction == 1: # 주황
            recommend_color = color[0:3]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif emotion == 2 and prediction == 0: # 노랑
            recommend_color = color[1:4]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif emotion == 6 and prediction == 0: # 연두
            recommend_color = color[2:5]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif emotion == 1 and prediction == 0: # 초록
            recommend_color = color[3:6]   
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif (emotion == 5 and prediction == 0) or (emotion == 6 and prediction == 1): # 청록
            recommend_color = color[4:7]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif (emotion == 1 and prediction == 1) or (emotion == 2 and prediction == 1): # 파랑
            recommend_color = color[5:8]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif emotion == 0 and prediction == 1: # 남색
            recommend_color = color[6:9]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        elif (emotion == 5 and prediction == 1) or (emotion == 0 and prediction == 0): # 보라
            recommend_color = color[4:7]
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]
        else: # 마젠타
            recommend_color = color[8:10]
            recommend_color.append(color[0])
            n1 = recommend_color[0]
            n2 = recommend_color[1]
            n3 = recommend_color[2]

        # emotion과 predicton에 따른 mention 지정
        if (emotion == 0 and prediction == 0):
            mention = "님, 오늘은 꽤 안정적인 하루였던 것으로 보여요. 오늘의 감정을 더 표현할 수 있는 색과 템플릿을 추천해드릴게요."
        elif (emotion == 0 and prediction == 1):
            mention = "님, 오늘은 유독 불안한 날이셨군요. 오늘은 불안을 완화시켜줄 색과 템플릿을 추천해드릴게요."
        elif (emotion == 1 and prediction == 0):
            mention = "님, 오늘은 놀랄만한 일이 있으셨군요! 오늘 느낀 감정을 표현하실 수 있는 적절한 색과 템플릿을 추천해드릴게요."
        elif (emotion == 1 and prediction == 1):
            mention = "님, 오늘은 무언가 놀랄만한 일이 있으셨던 것 같아요. 오늘 느낀 감정을 표현하실 수 있는 적절한 색과 템플릿을 추천해드릴게요."
        elif (emotion == 2 and prediction == 0):
            mention = "님, 오늘은 냉정하고 깊은 생각을 하신 것으로 보여요. 오늘의 상태를 표현하실 수 있는 색과 템플릿을 추천해드릴게요."
        elif (emotion == 2 and prediction == 1):
            mention = "님, 오늘은 무언가 화나는 일이 있으셨군요. 오늘의 감정을 진정시켜줄 수 있는 색과 템플릿을 추천해드릴게요."
        elif (emotion == 3 and prediction == 0):
            mention = "님, 오늘은 꽤 안정적인 하루였던 것으로 보여요. 오늘의 감정을 더 표현할 수 있는 색과 템플릿을 추천해드릴게요."
        elif (emotion == 3 and prediction == 1):
            mention = "님, 오늘은 우울한 하루였던 것으로 보여요. 우울한 감정을 완화시켜줄 색과 템플릿을 추천해드릴게요."
        elif (emotion == 4 and prediction == 0):
            mention = "님, 오늘은 안정된 상태를 보이시고 계시군요. 오늘의 색과 템플릿을 통해 감정을 더 표현해보세요."
        elif (emotion == 4 and prediction == 1):
            mention = "님, 오늘은 안정된 상태를 보이시고 계시군요. 오늘의 색과 템플릿을 통해 감정을 더 표현해보세요."
        elif (emotion == 5 and prediction == 0):
            mention = "님, 오늘은 행복한 날이군요! 오늘의 행복한 기분을 추천 색과 템플릿으로 표현해보세요."
        elif (emotion == 5 and prediction == 1):
            mention = "님, 오늘은 꽤 안정적인 하루였던 것으로 보여요. 오늘의 감정을 더 표현할 수 있는 색과 템플릿을 추천해드릴게요."
        elif (emotion == 6 and prediction == 0):
            mention = "님, 오늘은 표현이 두드러져 감정적인 상태인 것 같아요. 오늘의 감정을 표현할 수 있는 색과 템플릿을 추천해드릴게요."
        else:
            mention = "님, 오늘은 매우 화나는 날이신 것 같아요. 오늘의 추천 색과 템플릿을 통해 감정이 완화될 수 있을거에요."
        

        # 1번째 color의 랜덤 이미지 선정
        image1 = Template.objects.filter(color = n1).order_by('?').last()
        serializer1 = ImageSerializer(image1)

        # 2번째 color의 랜덤 이미지 선정
        image2 = Template.objects.filter(color = n2).order_by('?').last()
        serializer2 = ImageSerializer(image2)

        # 3번째 color의 랜덤 이미지 선정
        image3 = Template.objects.filter(color = n3).order_by('?').last()
        serializer3 = ImageSerializer(image3)

        # color object 얻어오기 (Foregin Key)
        c1 = Color.objects.get(color = n1)
        c2 = Color.objects.get(color = n2)
        c3 = Color.objects.get(color = n3)

        # 데이터 저장
        result = ColorResult.objects.create(user = user,
                                            b_image1 = serializer1.data['base_img'],
                                            b_image2 = serializer2.data['base_img'],
                                            b_image3 = serializer3.data['base_img'],
                                            l_image1 = serializer1.data['line_img'],
                                            l_image2 = serializer2.data['line_img'],
                                            l_image3 = serializer3.data['line_img'],
                                            color1 = c1,
                                            color2 = c2,
                                            color3 = c3,
                                            emotion = emotion,
                                            prediction = prediction,
                                            mention = mention
                                            )   
        result.save()

        # 결과값 반환
        serializer7 = ResultSerializer(result)
        return Response(serializer7.data, status = status.HTTP_200_OK)


class ResultAPIView(APIView) :
    def get(self, reqeust, format = None) :

        user = User.objects.get(email = self.request.user)
        result = ColorResult.objects.filter(user = user).last()
        serializer = ResultSerializer(result, context = {'request': reqeust})

        return Response(serializer.data, status = status.HTTP_200_OK)
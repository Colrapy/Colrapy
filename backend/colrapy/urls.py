"""colrapy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from colrapy.views import MainAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    # 메인 홈페이지 (로그인 후)
    path('colrapy/', MainAPIView.as_view()),
    # 회원 애플리케이션
    path('users/', include('users.urls')),
    # 다이어리 애플리케이션
    path('diary/', include('diary.urls')),
    # 캔버스 애플리케이션
    path('canvas/', include('canvas.urls')),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
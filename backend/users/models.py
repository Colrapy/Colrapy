from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

# Create your models here.
# 회원정보 생성 인스턴스
class UserManager(BaseUserManager) :
    # 회원 가입
    def create_user(self, username, password, email, age) :
        user = self.model(
            username = username,
            email = self.normalize_email(email),
            age = age,
            date_joined = timezone.now(),
            is_superuser = 0,
            is_staff = 0,
            is_active = 1
        )
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, username, email, password) :
        user = self.create_user(
            username = username,
            password = password,
            email = email,
        )

        user.is_superuser = 1
        user.is_staff = 1
        user.save(using = self._db)
        return user


# 회원 정보 테이블
class User(AbstractBaseUser) :
    # 사용자 이름
    username = models.CharField(max_length = 150)
    # 이메일
    email = models.EmailField(unique = True, max_length = 254)
    # 비밀번호
    password = models.CharField(max_length = 128)
    # 나이
    age = models.IntegerField(blank = True, null = True, default = 0)
    # 최고관리자 여부
    is_superuser = models.IntegerField()
    # 회원가입 날짜
    date_joined = models.DateTimeField()
    # 마지막 로그인 날짜
    last_login = models.DateTimeField(blank = True, null = True)
    # 관리자 여부
    is_staff = models.IntegerField(blank = True, null = True)
    # 활동 여부
    is_active = models.IntegerField(blank = True, null = True)
    
    # 클래스 이용 선언
    objects = UserManager()

    # 사용자 ID로 사용할 필드
    USERNAME_FIELD = 'email'
    # 필수 입력 필드
    REQUIRED_FIELDS = ['username']

    # 접근 권한 설정
    def has_perm(self, perm, obj = None) :
        return True
    
    def has_module_perms(self, app_label) :
        return True
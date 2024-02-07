import random, requests, re
from django.contrib.auth import login, logout, authenticate
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.status import HTTP_400_BAD_REQUEST
from .models import User
from .serializers import UserSerializer
from datetime import datetime

class UserViewSet(ModelViewSet):
    queryset = User.objects
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(self.request.data.get("password"))
        user.save()
    
    def perform_update(self, serializer):
        user = serializer.save()
        user.set_password(self.request.data.get("password"))
        user.save()

def send_sms(to, text):
    return requests.post("https://rest.payamak-panel.com/api/SendSMS/SendSMS", json={
        "username": "9361966744",
        "password": "cdmh375",
        "from": "50004001966744",
        "to": to,
        "text": text
    })

class AuthViewSet(ViewSet):
    temp_codes = {}

    @action(["GET"], False)
    def me(self, request):
        if request.user.is_authenticated:
            return Response(UserSerializer(request.user).data)

    @action(["POST"], False)
    def login(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return Response({"message": "ورود با موفقیت انجام شد."})
            else:
                return Response({"message": "نام کاربری (شماره همراه) یا رمز عبور اشتباه است."}, HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "عدم وجود پارامتر های مورد نیاز (نام کاربری، رمز عبور)"}, HTTP_400_BAD_REQUEST)
    
    @action(["GET"], False)
    def logout(self, request):
        logout(request)
        return Response({"message": "خروج با موفقیت انجام شد."})
    
    @action(["POST"], False)
    def register(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        code = request.data.get("code")
        if username and password and code:
            if code == self.temp_codes[username]["code"]:
                user = authenticate(request, number=username)
                if not user:
                    if re.match("^[A-z].{8,}$", password):
                        user = User.objects.create_user(username, password)
                        login(request, user)
                        return Response({"message": "ثبت نام با موفقیت انجام شد."})
                    else:
                       return Response({"message": "رمز عبور می بایست حداقل 8 کاراکتر و از حروف انگلیسی باشد."}, HTTP_400_BAD_REQUEST) 
                else:
                    return Response({"message": "این نام کاربری (شماره همراه) قبلاً استفاده شده است."}, HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "کد وارد شده نامعتبر است."}, HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "عدم وجود پارامتر های مورد نیاز (نام کاربری (شماره همراه)، کد دریافتی، رمز عبور)"}, HTTP_400_BAD_REQUEST)
    
    @action(["POST"], False)
    def send_code(self, request):
        username = request.data.get("username")
        if username:
            if username in self.temp_codes:
                time = (datetime.now() - temp_codes[username]["at"]).minute
                if time < 5:
                    return Response({"message": f"لطفا {5 - time} ثانیه دیگر مجدد تلاش نمایید."}, HTTP_400_BAD_REQUEST)
            code = random.randint(10000, 99999)
            response = send_sms(username, f"ساحراندیشه\nکد موقت شما: {code}\nلغو۱۱")
            if response.ok:
                self.temp_codes[username] = {
                    "code": code,
                    "at": datetime.now()
                }
                return Response({"message": "کد به صورت پیامک به شماره شما ارسال شد."})
            else:
                return Response({"message": "خطایی در ارسال پیامک وجود دارد (لطفا با پشتیبانی تماس بگیرید)."}, HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "عدم وجود پارامتر های مورد نیاز (نام کاربری (شماره همراه))"}, HTTP_400_BAD_REQUEST)
    
    @action(["POST"], False)
    def change_password(self, request):
        username = request.data.get("username")
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")
        code = request.data.get("code")
        if code and old_password and new_password:
            if code == self.temp_codes[username]["code"]:
                user = User.objects.get(username=username)
                if user.check_password(old_password):
                    if re.match("^[A-z].{8,}$", new_password):
                        user.set_password(new_password)
                        user.save()
                        return Response({"message": "رمز عبور با موفقیت تغییر کرد."})
                    else:
                        return Response({"message": "رمز عبور جدید می بایست حداقل 8 کاراکتر و از حروف انگلیسی باشد."}, HTTP_400_BAD_REQUEST)
                else:
                    return Response({"message": "رمز قدیمی نادرست می باشد."}, HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "کد نامعتبر می باشد."}, HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "عدم وجود پارامتر های مورد نیاز (نام کاربری، کد یکبار مصرف، رمز قدیمی، رمز جدید)"}, HTTP_400_BAD_REQUEST)

from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from datetime import datetime
from .models import Request
from .serializers import RequestSerializer

class RequestViewSet(ModelViewSet):
    queryset = Request.objects.filter(at__date=datetime.now().date())
    serializer_class = RequestSerializer
    permission_classes = [IsAdminUser]

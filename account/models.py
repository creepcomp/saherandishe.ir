from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    address = models.CharField(max_length=256, null=True)
    postal_code = models.DecimalField(max_digits=10, decimal_places=0, null=True)

from django.utils.text import slugify
from django.utils.html import strip_tags
from rest_framework.serializers import ModelSerializer, CharField
from .models import Product, Category, Brand
from markdown import markdown

class ProductSerializer(ModelSerializer):
    description = CharField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

class ProductListSerializer(ModelSerializer):
    description = CharField(read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name", "slug", "price", "discount", "images", "available", "specification", "description"]

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class BrandSerializer(ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"

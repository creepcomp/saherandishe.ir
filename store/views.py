import io, uuid
from datetime import datetime
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from PIL import Image, ImageDraw, ImageFont
from .models import Product, Category, Brand
from .serializers import ProductSerializer, ProductListSerializer
from .serializers import CategorySerializer, BrandSerializer
from .permissions import IsAdminUserOrReadOnly

class ProductViewSet(ModelViewSet):
    queryset = Product.objects
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_serializer_class(self):
        if self.action == "LIST":
            return ProductListSerializer
        return super().get_serializer_class()
    
    def get_queryset(self):
        kwargs = self.request.query_params.dict()
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset.filter(**kwargs)
        return queryset.filter(show=True, available__gt=0, **kwargs)

    @action(["POST"], False)
    def upload(self, request):
        images = []
        for filename, file in request.FILES.items():
            filename = f"{uuid.uuid4()}.jpg"
            image = Image.open(io.BytesIO(file.read())).convert("RGB")
            width, height = image.size
            offset  = int(abs(height-width)/2)
            if width>height:
                image = image.crop([offset, 0, width - offset, height])
            else:
                image = image.crop([0, offset, width, height - offset])
            image.resize([1000, 1000])
            draw = ImageDraw.Draw(image)
            draw.text((25, image.height - 50), "saherandishe.ir", (0, 0, 0), ImageFont.load_default(size=32))
            image.save(f"media/{filename}", "jpeg")
            images.append(filename)
        return Response({"status": "success", "images": images})

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset.all()
        return queryset.filter(show=True)

class BrandViewSet(ModelViewSet):
    queryset = Brand.objects
    serializer_class = BrandSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.user.is_staff:
            return queryset.all()
        return queryset.filter(show=True)

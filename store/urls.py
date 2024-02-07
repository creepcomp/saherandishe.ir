from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, BrandViewSet

router = DefaultRouter()
router.register("products", ProductViewSet)
router.register("categories", CategoryViewSet)
router.register("brands", BrandViewSet)

from .sitemaps import ProductSitemap

sitemaps = {"product": ProductSitemap}

urlpatterns = [
    # API
    path("store/", include(router.urls)),
    # Sitemap
    path("store/sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="django.contrib.sitemaps.views.sitemap")
]

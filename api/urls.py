from rest_framework import routers
from .views import quizViewSet

router = routers.DefaultRouter()
router.register(r'quizes', quizViewSet)

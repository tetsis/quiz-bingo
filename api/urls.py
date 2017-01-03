from rest_framework import routers
from .views import quizViewSet
#from .views import bingoViewSet

router = routers.DefaultRouter()
router.register(r'quizzes', quizViewSet)
#router.register(r'bingos', bingoViewSet)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    OrganizationViewSet,
    DepartmentViewSet,
    PositionViewSet,
    EmployeeViewSet,
    FileViewSet,
    HrOperationViewSet,
    ChangeHistoryViewSet,
    UserViewSet,
    LoginView,
    RegisterView,
    MeView,
)

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet, basename='organization')
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'positions', PositionViewSet, basename='position')
router.register(r'employees', EmployeeViewSet, basename='employee')
router.register(r'files', FileViewSet, basename='file')
router.register(r'hr-operations', HrOperationViewSet, basename='hr-operation')
router.register(r'change-history', ChangeHistoryViewSet, basename='change-history')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    # Auth
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('auth/me/', MeView.as_view(), name='auth-me'),
    # API
    path('', include(router.urls)),
]

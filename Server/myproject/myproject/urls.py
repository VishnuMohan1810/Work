"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/',views.register,name="register"),
    path('login/',views.loginfn,name="login"),
    path('add_blog/',views.add_blog),
    path('view_blog/',views.view_blog,name='post_list'),
    # path('posts/<int:post_id>/comment/', views.add_comment, name='add_comment')
    #  path('add_comment/', views.add_comment, name='add_comment'),
    # path('view_comments/<int:blog_id>/', views.view_comments, name='view_comments'),
    # path('view_blog/<int:blog_id>',views.view_blog),
    # path('add_comment/',views.add_comment),

    # path('delete_blog/<int:id>',views.deleteblog),
    # path('update_blog/',views.updateblog),
]


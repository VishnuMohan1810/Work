from rest_framework import serializers
from myapp.models import User,BlogPost,Comment
from django.db.models import fields

class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","first_name","last_name","email","mobilenumber","gender","password","username")

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content','created_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'blog_post', 'user', 'content', 'created_at']



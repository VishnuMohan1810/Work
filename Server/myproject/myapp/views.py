from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import UserSerialiser,BlogSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate
from myapp.models import User,BlogPost
from rest_framework import status


@api_view(['POST'])
def register(request):
    print(request.data)
    regdata = UserSerialiser(data=request.data)
    if regdata.is_valid():
        regdata.save()
        return Response({'status':1,"values":regdata.data})
    else:
        return Response({'status':0,"values":"faield"})


@api_view(['POST'])
def loginfn(request):
    print(request.data)
    username = request.data.get("username")
    password = request.data.get("password")
    # user = authenticate(username=username, password=password)
    user = User.objects.get(username=username, password=password)
    print(user,"-------------")
    if user is not None:
        user_data = UserSerialiser(user).data
        return Response({'status': 1, 'values': user_data})
    else:
        return Response({'status': 0, 'values': "Login failed. Invalid credentials"})
# View All Blogs or Create a New Blog

@api_view(['POST'])
def add_blog(request):
    print(request.data)
    blog = BlogSerializer(data=request.data)
    if blog.is_valid():
        blog.save()
        return Response({'status':1,"values":blog.data})
    else:
        return Response({'status':0,"values":"faield"})

@api_view(['GET'])
def view_blog(request):
    blogs = BlogPost.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response({"data":serializer.data})


@api_view(['POST'])
def add_comment(request):
    print(request.data)
    comment_data = CommentSerializer(data=request.data)
    if comment_data.is_valid():
        comment_data.save()
        return Response({'status': 1, 'values': comment_data.data})
    else:
        return Response({'status': 0, 'values': "Failed to add comment"})

@api_view(['GET'])
def view_comments(request, blog_id):
    comments = Comment.objects.filter(blog_post=blog_id)
    serializer = CommentSerializer(comments, many=True)
    return Response({"data": serializer.data})

# Edit a blog post
@api_view(['PUT'])
def edit_blog(request, blog_id):
    try:
        blog = BlogPost.objects.get(id=blog_id)
        serializer = BlogSerializer(blog, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except BlogPost.DoesNotExist:
        return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)
    

# # Delete a blog post
@api_view(['DELETE'])
def delete_blog(request, blog_id):
    try:
        blog = BlogPost.objects.get(id=blog_id)
        blog.delete()
        return Response({"message": "Blog deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except BlogPost.DoesNotExist:
        return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)




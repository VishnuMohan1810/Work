from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    mobilenumber = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=15, blank=True, null=True)

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)




class Comment(models.Model):
    blog_post = models.ForeignKey(BlogPost, related_name='comments', on_delete=models.CASCADE)  # Link comment to a blog post
    author = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user who made the comment
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author} on {self.blog_post}'


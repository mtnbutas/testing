# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from django.core import serializers
from django.shortcuts import render, redirect, reverse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from tweets.models import Tweet

# Create your views here.
def index(request):
	return render(request, 'index.html')


@method_decorator(csrf_exempt, name='dispatch')
class Tweets(View):
	def get(self, request):
		data = serializers.serialize("json", Tweet.objects.all().order_by('-create_date'))
		return HttpResponse(data, content_type="application/json")

	def delete(self, request):
		data = json.loads(request.body)
		pk = data.get('pk')
		Tweet.objects.get(pk=pk).delete()
		
		response = json.dumps({'status': 'ok'})
		return HttpResponse(response, content_type="application/json")

	def post(self, request):
		data = json.loads(request.body.decode('utf-8'))
		new_tweet = Tweet(content=data.get('content'))
		new_tweet.save()

		response = serializers.serialize("json", [new_tweet])
		return HttpResponse(response, content_type="application/json")
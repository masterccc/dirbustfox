#!/usr/bin/python

left = True

switch = lambda x: False if x else True

for line in open("list.txt","r").readlines():
	if(line[0] == '#'):
		s = ""
		if(left == False):
			s += '<div class="testitem test cright"></div>'
		s += '<div class="menuheader">' + line.rstrip()[1:] + '</div>'
		print(s)
		left = True
	else:
		itm = line.rstrip().split(" ")
		s = ""
		s+= '<div value="' + itm[0]+'" class="testitem itemvalue '
		s+= 'cleft' if left else "cright"
		s+= '"><input checked type="checkbox">'
		s+= " ".join(itm[1:]) + ' (' + itm[0] + ')</div>'
		print(s)
		left = switch(left)

if(left == False):
	s = ''
	s += '<div class="testitem test cright"></div>'
	s += '<div class="menuheader">' + line.rstrip()[1:] + '</div>'
	print(s)
#<div value="/.git/HEAD" class="testitem test"><input checked type="checkbox">Git repo (/.git/HEAD)</div>
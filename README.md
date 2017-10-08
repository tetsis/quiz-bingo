# quiz-bingo

## Install

### Git

```
# yum -y install git
```

### Python3

```
# yum install -y https://centos7.iuscommunity.org/ius-release.rpm
# yum install -y python36u python36u-pip python36u-mod_wsgi
```

### Django

```
# pip3.6 install django
```

### Apache

```
# yum -y install httpd
# useradd www-data -g apache
# chmod 770 /home/www-data/

# mkdir /var/www/static
# chown www-data:apache /var/www/static
# chmod 775 /var/www/static

# su - www-data
$ git clone https://github.com/tetsis/quiz-bingo.git
$ cd quiz-bingo/quizbingo
$ python3.6 manage.py collectstatic
$ python3.6 manage.py migrate
$ exit

# vim /etc/httpd/conf/httpd.conf

WSGIScriptAlias / /home/www-data/quiz-bingo/quizbingo/wsgi.py
WSGIPythonPath /home/www-data/quiz-bingo
Alias /static/ /var/www/static/
 
<Directory /home/www-data/quiz-bingo/quizbingo>
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
<Directory /var/www/static>
    Order deny,allow
    Allow from all
</Directory>

# systemctl start httpd
# systemctl enable httpd 
```

## Easy Run

```
$ python3.6 manage.py runserver 0:8000
```

## CSV format

```
[Quiz], [Answer], [Genre]
```

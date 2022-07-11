FROM --platform=linux/amd64 mysql:8.0

RUN mkdir /var/log/mysql
RUN chown mysql:mysql /var/log/mysql

COPY ./docker/db/my.cnf /etc/my.cnf

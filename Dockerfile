FROM mysql:latest

ENV MYSQL_DATABASE=GuateMalaDepot
ENV MYSQL_ROOT_PASSWORD=36L8W7Nm
ENV MYSQL_USER=matiu
ENV MYSQL_PASSWORD=36L8W7Nm

COPY schema.sql /docker-entrypoint-initdb.d/

EXPOSE 22809

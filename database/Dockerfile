FROM postgres:15.2-alpine
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=userdb
ENV POSTGRES_PORT=8001
# COPY database/userdb.sql /docker-entrypoint-userdb.d/
EXPOSE ${POSTGRES_PORT}
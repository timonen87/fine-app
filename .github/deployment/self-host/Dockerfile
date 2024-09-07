FROM openresty/openresty:1.25.3.2-0-buster

WORKDIR /app
COPY ./nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY ./affine.nginx.conf /etc/nginx/conf.d/affine.nginx.conf

RUN mkdir -p /var/log/nginx && \
  rm /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]

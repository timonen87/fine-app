# FROM openresty/openresty:1.25.3.2-0-buster

# COPY ./.github/deployment/nginx/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
# COPY ./.github/deployment/nginx/affine.nginx.conf /etc/nginx/conf.d/affine.nginx.conf

# RUN mkdir -p /var/log/nginx && \
#   rm /etc/nginx/conf.d/default.conf

# EXPOSE 8080

# CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]


# Base on offical NGINX Alpine image
FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]

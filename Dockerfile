FROM node:5
MAINTAINER OpenISDM <openisdm@gmail.com>

# set some environment variables
ENV NODE_ENV dev

RUN npm install -g yo bower

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN mkdir -p /var/www/html/app
RUN mkdir -p /var/www/html/app/docker
WORKDIR /var/www/html/app
# ADD package.json /var/www/html/app/package.json
# ADD bower.json /var/www/html/app/bower.json
# RUN npm install && bower install --allow-root
COPY docker/init.sh docker/init.sh

VOLUME /var/www/html/app

EXPOSE 3000

# ENTRYPOINT ["/usr/local/bin/gulp serve"]
CMD ["bash"]

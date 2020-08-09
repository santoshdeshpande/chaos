FROM node:lts-alpine
RUN mkdir -p /opt/app
# ENV NODE_ENV=production
WORKDIR /opt/app
RUN adduser --disabled-password app
COPY ./package*json ./
COPY ./yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
USER app
# RUN chown -R app:app /opt/app
EXPOSE 8000
CMD ["yarn", "start"]
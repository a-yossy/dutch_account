FROM ruby:3.1.2

COPY ./server/Gemfile /server/Gemfile
COPY ./server/Gemfile.lock /server/Gemfile.lock
WORKDIR /server
RUN bundle install
COPY ./server/ /server/

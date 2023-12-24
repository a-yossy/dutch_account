FROM ruby:3.1.2

WORKDIR /server
COPY ./server/Gemfile /server/Gemfile
COPY ./server/Gemfile.lock /server/Gemfile.lock
RUN bundle install

# Add a script to be executed every time the container starts.
COPY ./docker/server/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3010

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]

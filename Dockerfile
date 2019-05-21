FROM node:10

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run

# default to port 3000 for node, and 5858 for debug
ENV PORT 3000
EXPOSE $PORT 5858

WORKDIR /code
# install dependencies first, in a different location for easier app bind mounting for local development

COPY package.json .
RUN npm install
# RUN mv /code/node_modules /node_modules


# copy in our source code last, as it changes the most
COPY . .

CMD ["start"]
ENTRYPOINT ["npm", "run"]

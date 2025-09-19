# Redis
> in memory data store

Steps to install the docker image
    1) Opne, Run Redis Stack on Docker
     run below command
     docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
    2) excute the container
         docker exec -it 40145a72835b bash
    3) redis-cli // it will help to execute the redis command and will connet the terminal to the redis server
    4) install the redis package ioredis



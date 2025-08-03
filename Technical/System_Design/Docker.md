https://www.youtube.com/watch?v=exmSJpJvIPs&ab_channel=ApnaCollege
Docker:-
It is platform which helps us build container
Docker is a platform for developing and running applications inside containers.

A container is a lightweight, standalone, executable package of software that includes everything needed to run it: the code, a runtime (like Node.js or Java), system tools, system libraries, and settings.

DOcker Container:-
    1) Poratable
    2) light weight

Docker Image:- it's a file which contains the instruction to buid the container
    it helps us create multiple container

**Doker Insatalltion:-**
    1) Download the docker from the link  https://www.docker.com/
    2) to check weather docker is insatlled or not use command "docker"
    3) Command to chect docker version "docker -v"
    4) If you faced any issue related to WSL then follow the below steps
        Step 1: Open PowerShell as Administrator
            > Click on the Start Menu.
            > Type "PowerShell".
            > Right-click on Windows PowerShell and select Run as administrator.
        Step 2: Run the WSL Update Command
            > wsl --update
        Step 3: Restart Docker Desktop
    4) use "https://hub.docker.com/" for docker images  

**Docker Image Layers**
    > we can change only container layer
    > other layers immutable

**Port Binding**    
    > Port binding in Docker, also known as port mapping or publishing, is the process of mapping a port on the host machine to a port inside a Docker container. This allows external traffic to reach services running within the container, making them accessible from the host or other machines on the network. 
    docker run -p <host_port>:<container_port> <image_name>

**Docker Compose**   
    Dcoker compose is tool for defining  and running multi container applications.

    **Docker Compose Command**
        1) docker compose -f "file name" up -d
        2) docker compose -f "file name" down // to delete the container present the file

**Docker Commands**   
    1) To pull images from docker hub into your machine
        docker pull hello-world // it will pull latest version of the image
        docker pull hello-word:version // it will pull specific version

    2) To check available images
        docker images  

    3) To create the container from the docker image
        docker run "image name" 
        docker run -it "image name" // it  (interactive mode, it allows us to access the container terminal which helps us input and output editor ) 

    4) to check the total container available
        docker ps -a
        docker ps (it will return the runing container)

    5) to check the environment variable
        env
    6) to exit 
        exit

    7) to start the container
        docker start "container name or conatiner ID"  

    8) to stop the container
        docker stop "container name or conatiner ID"   

    9) to remove container
        docker rm "container name or ID"

    10) to remove Image
        docker rmi "Image Name or ID"   

    11) to run the container in detach mode, meaning it will be run in background(by default container runs in attach mode)
        docker run -d "image name"   

    12) ... where some-mysql is the name you want to assign to your container, my-secret-pw is the password to be set for the MySQL root user and tag is the tag specifying the MySQL version you want. See the list above for relevant tags. 
        docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
        docker run --name "contaner name" -d "image name"

    13) Port Binding
        docker run -p <host_port>:<container_port> <image_name>
        <host_port>: The port on the host machine that you want to use.
        <container_port>: The port inside the container where the service is listening.
        <image_name>: The name of the Docker image to run.

    14) to check the docker network
        docker network ls  

    15) to create the docker network
        docker network create "name of the network" 

    16) To delete the docker network
        docker network rm "network name"            

**Troubleshoot Command**  
    14) to check the logs
        docker logs "container ID"
    15) it allows us to run additional commands on an already running container
        docker exec -it container_ID /bin/bash
        docker exec -it container_ID /bin/sh // shell 

**Setting up Mongo and Mongo-express** 
    > docker run -d -p 27017:27017 --name mongo --network mongo-network -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=qwerty mongo

    >  docker run -d -p 8081:8081 --name mongo-express --network mongo-network -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty -e ME_CONFIG_MONGODB_URL="mongodb://admin:qwerty@mongo:27017" mongo-express

    > Open "http://localhost:8081/" and admin as username and pass as password

**Dockerizing our APP** 
    > the process of converting the our application into running docker container
    > we need to create the docker file
    > in docker file we can have multiple RUN command but , it should have only single CMD command
    > to create the docker image from Dockerfile we need to execute the below command
        docker build -t "image name which we want to create":1.0 .
        docker build -t "testapp":1.0 .


**Docker Volumes**
    volumes are persistent data store in container 
    Command to create the folder in host machine and container 
        docker run -it -v C:\Users\nehad\Desktop\docker-data:/test/data ubuntu
    Now create the go inside the /test/data and create the files
        touch index.html
        touch server.js
    you can see the same file in desktop folder as well  

   **Docker Volume Command** 
    1) to list down all the volumes
        docker volume ls

    2) to create the custome volume
        docker volume create "volume name"  // also known as named volume

        by default in windows docker create the volume in below location
        Windows : C:\ProgramData\docker\volumes
        mac : /var/lib/docker\volumes


    3) to delete the volume
        docker volume rm "volume name" 

    4) TO attach the named volume(created volumes) to any container there are three ways
        > Named Volumes
          docker run -v VOL_NAME:CONTAINER_DIR
        > Annonymous volume
            docker run -v MOUNT_PATH 
        > Bind Mount
            docker run -v HOST_DIR:CONTAINER_DIR 

        Difference between bind and other two is
            >in bind mount volume ko host machine ka OS hai wo manage karta hai   
            > in other two , docker creates the volume and explictly manage it  

    5) deletes all unused local volumes.
        docker volume prune  


**Network Drivers**
https://docs.docker.com/engine/network/drivers/ 
    **bridge**: The default network driver. If you don't specify a driver, this is the type of network you are creating. Bridge networks are commonly used when your application runs in a container that needs to communicate with other containers on the same host 
    **host**: Remove network isolation between the container and the Docker host, and use the host's networking directly                                
    **none**: Completely isolate a container from the host and other containers.



    


   

    


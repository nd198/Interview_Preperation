https://www.youtube.com/watch?v=exmSJpJvIPs&ab_channel=ApnaCollege
https://www.youtube.com/watch?v=rr9cI4u1_88&t=5541s&ab_channel=HiteshChoudhary
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

**What problem does Docker solve? Why would a developer choose to use Docker?**
Docker solves the problem of "it works on my machine" syndrome. It packages applications and their dependencies into standardized units called containers, ensuring they run consistently across different environments (development, testing, production). Developers choose Docker for:
    > Consistency: Applications behave the same everywhere.
    > Isolation: Containers isolate applications from each other and the host system.
    > Portability: Containers can be easily moved and run on any Docker-enabled machine.
    > Efficiency: Containers are lightweight and start quickly compared to virtual machines.
    > Scalability: Easy to replicate and scale applications.
**What is the difference between a Docker image and a Docker container?**
    > Docker Image: A read-only, self-contained template that includes the application, its dependencies, libraries, and configuration. Think of it as a blueprint or a class. You build an image from a Dockerfile.
    > Docker Container: A runnable instance of a Docker image. It's the actual running application created from an image. You can have multiple containers running from the same image. Think of it as an object created from a class.
**How do you build a Docker image from a Dockerfile? What is a Dockerfile?**
    To build a Docker image, you use the command: docker build -t your-image-name:tag . (the . indicates the current directory where the Dockerfile is located).
    A Dockerfile is a plain text file that contains a set of instructions for Docker on how to build a Docker image. Each instruction creates a layer in the image.
    How do you run a Docker container from an image?
    You use the docker run command. For example: docker run your-image-name:tag
    Common options include:
    -d: Run in detached mode (in the background).
    -p host_port:container_port: Publish a container's port to the host.
    --name your-container-name: Assign a custom name to the container.
**What is a Docker Hub, and what is its purpose?**
    Docker Hub is a cloud-based registry service provided by Docker. Its purpose is to store and share Docker images publicly or privately. It's like GitHub for Docker images. You can push your custom images to Docker Hub and pull official images or images from other users.
**How do you list all running Docker containers? How do you stop a running container?**
    > To list all running Docker containers: docker ps
    > To list all Docker containers (including stopped ones): docker ps -a
    > To stop a running container: docker stop container_id_or_name
    > To remove a stopped container: docker rm container_id_or_name

**Explain the concept of Docker volumes. Why are they important, and when would you use them?**
    Docker volumes are the preferred mechanism for persisting data generated by and used by Docker containers. They are important because:
    > Data Persistence: When a container is removed, any data written inside its writable layer is also removed. Volumes allow data to outlive the container.
    > Sharing Data: Volumes can be shared between multiple containers.
    > Performance: Volumes often perform better than bind mounts for I/O heavy workloads.
    You would use them for:
    Database files (e.g., PostgreSQL, MySQL data).
    Application logs.
    Configuration files that need to persist across container restarts or removals.
    Sharing code or data between development containers. 

**What is Docker Compose? Provide a simple example of a docker-compose.yml file for a Node.js application with a database.**
    Docker Compose is a tool for defining and running multi-container Docker applications. It uses a YAML file (docker-compose.yml) to configure an application's services, networks, and volumes. With a single command (docker-compose up), you can create and start all the services from your configuration.       

**How do you expose ports from a Docker container to the host machine? Why is this necessary?**
    You expose ports using the -p or --publish flag with docker run or in the ports section of a docker-compose.yml file.
    Syntax: -p host_port:container_port
    Example: docker run -p 8080:3000 my-node-app (maps host's port 8080 to the container's port 3000).
    This is necessary because, by default, containers run in isolation, and their internal ports are not accessible from the host machine or the outside world. Port mapping allows external traffic to reach the services running inside the container.

**Describe the CMD and ENTRYPOINT instructions in a Dockerfile. What are their differences, and when would you use one over the other?**
    Both CMD and ENTRYPOINT define the command that gets executed when a container starts from the image.
    CMD:
        > Sets default arguments or a command for an executing container.
        > Can be easily overridden when running docker run (e.g., docker run myimage ls -l).
        > Only the last CMD instruction in a Dockerfile will be effective.
        > Best used for providing default commands that can be overridden.
    ENTRYPOINT:
        > Configures a container to run as an executable.
        > Arguments passed to docker run are appended to the ENTRYPOINT command, acting as arguments to the entrypoint.
        > Harder to override (requires docker run --entrypoint).
        > Best used when you want to define a fixed command that your container will always execute, and you want to pass additional arguments to that command. 
    **When to use:**
    > CMD only: For simple images where you just want to run a single command (e.g., CMD ["node", "app.js"]).
    > ENTRYPOINT with CMD: The common pattern. ENTRYPOINT defines the main executable, and CMD provides default arguments for that executable.
    Example: ENTRYPOINT ["nginx"] and CMD ["-g", "daemon off;"]. If you run docker run my-nginx ls, ls becomes an argument to nginx, which usually doesn't make sense.
    > ENTRYPOINT only: When you want your container to behave like a standalone executable (e.g., a command-line tool). 

**How can you inspect a running Docker container to see its logs or execute a command inside it?**
    > To see logs: docker logs container_id_or_name
        1) Use -f or --follow to stream logs in real-time.
        2) Use --tail N to show the last N lines.
    > To execute a command inside it: docker exec -it container_id_or_name command
        1) -i: Keep STDIN open even if not attached.
        2) -t: Allocate a pseudo-TTY. (Often combined as -it for interactive shell sessions).
        Example to get a shell: docker exec -it my-node-app sh or docker exec -it my-node-app bash (if bash is installed).

**What are Docker networks, and why are they used in multi-container applications?**
    Docker networks provide a way for containers to communicate with each other. When you create a container, it can connect to one or more networks.
    **Why they are used in multi-container applications:**
        > Service Discovery: Containers on the same Docker network can communicate with each other using their service names (e.g., in a docker-compose.yml, if you have a web service and a db service on the same default network, web can connect to db using db as the hostname).
        > Isolation: Networks segment applications, providing better security and preventing unintended communication between unrelated services.
        > Load Balancing: When using tools like Docker Swarm or Kubernetes, networks facilitate internal load balancing between replicated services.
        > External Access Control: You can control which networks are exposed to the host or external world.
        The most common network drivers are bridge (default for standalone containers and Compose), host, and overlay (for Swarm). 

**Explain the concept of multi-stage builds in Dockerfiles. What are the benefits, and how do you implement them?**
    Multi-stage builds allow you to use multiple FROM statements in your Dockerfile, with each FROM starting a new build stage. You can selectively copy artifacts from one stage to another, discarding everything you don't need from the previous stages.
    **Benefits:**
    > Smaller Image Size: This is the primary benefit. You avoid including build-time dependencies, temporary files, and development tools in your final production image, resulting in significantly smaller and more efficient images.
    > Improved Security: Fewer unnecessary components mean a smaller attack surface.
    > Faster Builds (in some cases): Caching layers effectively across stages.
    > Cleaner Dockerfiles: Separates build logic from runtime logic.
        `# Stage 1: Build the application
        FROM node:18-alpine AS builder # Name this stage 'builder'
        WORKDIR /app
        COPY package*.json ./
        RUN npm install
        COPY . .
        RUN npm run build # Assuming a build step for a frontend or transpilation

        # Stage 2: Create the final production image
        FROM node:18-alpine # Use a lean base image for runtime
        WORKDIR /app
        COPY --from=builder /app/package*.json ./ # Copy only necessary files from builder
        COPY --from=builder /app/node_modules ./node_modules
        COPY --from=builder /app/dist ./dist # Copy built artifacts
        # Or, if it's a simple Node.js app without a 'build' step,
        # you might just copy src and node_modules from the builder.

        EXPOSE 3000
        CMD ["node", "dist/app.js"] # Or whatever your entrypoint is`
        In this example, the builder stage compiles/builds the app, and then only the essential runtime artifacts (like node_modules and dist) are copied to the much smaller node:18-alpine base image in the second stage. The large build tools and source code from the builder stage are discarded.
**How do you optimize Docker image size? List several techniques.**
    Optimizing image size is crucial for faster deployments, lower resource usage, and better security. **Techniques include:**
        > Multi-Stage Builds: (As explained above) The most effective technique.
        > Use Smaller Base Images: Prefer alpine versions of base images (e.g., node:18-alpine, python:3.9-slim-buster) over full versions. Even smaller, distroless images exist for Go or compiled languages.
        > Combine RUN Instructions: Each RUN instruction creates a new layer. Combining multiple commands into a single RUN command (using && and \) reduces the number of layers.
        Example: RUN apt-get update && apt-get install -y --no-install-recommends some-package && rm -rf /var/lib/apt/lists/*
        > Clean Up After RUN Commands: Remove caches, temporary files, and downloaded packages immediately after they're used in the same RUN command. (e.g., rm -rf /var/lib/apt/lists/* for Debian/Ubuntu).
        > .dockerignore File: Exclude unnecessary files and directories from the build context (see Q15).
        Leverage Build Cache: Order your Dockerfile instructions from least to most frequently changing. Instructions like COPY . . should come later, so changes to your source code don't invalidate caches for earlier, stable layers (like npm install).
        > Only Install What's Needed: Be specific with package installations. Use --no-install-recommends with apt-get.
        > Avoid Unnecessary Packages: Don't install development tools, debuggers, or documentation in your final production image. 
**What is the role of a .dockerignore file, and how does it relate to building efficient images?**
    A .dockerignore file works similarly to a .gitignore file but for Docker builds. It specifies files and directories that should be excluded when Docker builds an image.
    **Role and Relation to Efficiency:**
        > Reduces Build Context Size: When you run docker build ., Docker first sends the entire "build context" (the directory where your Dockerfile resides, or the path you specify) to the Docker daemon. If this context contains large, unnecessary files (like node_modules, .git folders, local logs, temporary build artifacts, or large data files), it significantly slows down the build process and consumes more resources.
        > Improves Build Speed: By excluding irrelevant files, less data needs to be transferred to the Docker daemon, leading to faster build times.
        > Prevents Unintended Copies: It ensures that COPY . . instructions only bring in necessary application files, not extraneous ones. This contributes to smaller image sizes and cleaner images.
        > Leverages Caching: If large, frequently changing files are ignored, the COPY layers are less likely to be invalidated by those changes, allowing Docker to use its build cache more effectively for previous layers. 

**What are the security best practices when creating Docker images and running containers?**
    > Use Minimal Base Images: As discussed in Q14 (e.g., alpine, slim, distroless). Less code means fewer vulnerabilities.
    > Avoid Running as Root: Always create a non-root user in your Dockerfile and switch to it using the USER instruction. If a container running as root is compromised, it could potentially gain root access on the host. 
    Keep Images Up-to-Date: Regularly rebuild your images to include the latest security patches from base images and application dependencies.
    > Scan Images for Vulnerabilities: Use tools like Docker Scout, Trivy, Clair, or integrated registry scanners (ECR, GCR) to identify known vulnerabilities in your images.
    > Sign and Verify Images: Use Docker Content Trust to ensure images are from trusted sources and haven't been tampered with.
    > Minimize Exposed Ports: Only expose ports that are absolutely necessary for your application to function.
    > Use .dockerignore: Prevent sensitive files (like .env with secrets, .git configs) from being copied into the image.
    > Don't Store Secrets in Images: Never hardcode passwords, API keys, or other sensitive information directly in your Dockerfile or application code within the image. Use environment variables (carefully), Docker Secrets, Kubernetes Secrets, or a dedicated secret management solution (e.g., HashiCorp Vault).
    > Read-Only Filesystems: Consider running containers with a read-only filesystem (--read-only flag with docker run) to prevent malicious writes, relying on volumes for any necessary writes.
    > Limit Container Capabilities: Drop unnecessary Linux capabilities (--cap-drop ALL) and only add back what's truly needed (--cap-add NET_BIND_SERVICE). 
    > Regularly Audit Dockerfiles: Review your Dockerfiles for any insecure practices.

**Explain Docker Swarm and its purpose. How does it differ from Kubernetes?**
    **Docker Swarm:**
        > Purpose: Docker Swarm is Docker's native orchestration solution for managing a cluster of Docker nodes as a single virtual Docker engine. It allows you to deploy, scale, and manage containerized applications across multiple machines.
        > Features: It provides basic orchestration features like service discovery, load balancing, desired state reconciliation, and rolling updates.
        > Simplicity: It's often considered simpler to set up and use than Kubernetes, especially for those already familiar with Docker commands.
        > Integration: Tightly integrated with the Docker CLI.
    **When to choose which:**
    > Docker Swarm: Good for smaller projects, simpler applications, rapid prototyping, or when your team is already heavily invested in the Docker ecosystem and doesn't need the full power and complexity of Kubernetes.
    > Kubernetes: The go-to choice for large-scale, complex, production-critical applications, microservices architectures, and environments requiring high availability, advanced features, and a thriving ecosystem.     


1) Different between container and virtual machine
2) Docker Daemon
3) multi stacge build and why are they imporatant
4) Explain the relationship between a Docker Image and a Docker Container
    > Use the classic class vs. object analogy. An Image is a blueprint—a passive, immutable, read-only template containing the application code, a runtime, libraries, and environment variables.
    > A Container is a running instance of an image. It's the live, executable package. You can have many containers running from the same image.
5) How do you ensure your Docker images are small and efficient?
6) What's the difference between CMD and ENTRYPOINT in a Dockerfile? When would you use both?
7) How should you handle secrets and sensitive configuration in Docker?
8) How does Docker's layer caching work, and how would you structure your Dockerfile to take maximum advantage of it?
    > How it Works: Docker builds an image by executing each instruction in the Dockerfile sequentially. After each instruction, it creates a new layer and caches it. If the instruction hasn't changed, and none of the instructions before it have changed, Docker will use the cached layer instead of re-running the instruction.
    > Optimization Strategy: You must order your Dockerfile instructions from least frequently changing to most frequently changing.
    > Practical Example (for a Node.js app):
    COPY package.json ./ (Dependencies change infrequently)
    RUN npm install (This step is only re-run when package.json changes)
    COPY . . (Copy the rest of the source code, which changes on every build)
9) What is container orchestration, and why is it necessary?
    > The Problem: Running a single container is easy (docker run). But in production, you have dozens of microservices, need to manage them across multiple host machines, handle failures, scale them up and down, and manage networking between them. Doing this manually is impossible.
    > The Solution: Container orchestrators like Kubernetes or Docker Swarm automate this. They are the "brains" of a distributed system.
    > Key Responsibilities: Mention key features like scheduling (placing containers on hosts), service discovery, load balancing, self-healing (restarting failed containers), and scaling.  
10) what is CMD and ENtrypoint in docker
11) health chekc in docker container
12) how to communicate between docker container      






    


   

    


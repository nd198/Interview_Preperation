**Kunbernetes**
https://www.youtube.com/watch?v=a-nWPre5QYI&ab_channel=PiyushGarg

https://www.youtube.com/watch?v=6_gMoe7Ik8k&list=PLl4APkPHzsUUOkOv3i62UidrLmSB8DcGC&ab_channel=TechTutorialswithPiyush

https://www.youtube.com/watch?v=rBeyHDKLVqM&ab_channel=MPrashant
https://www.youtube.com/watch?v=XuSQU5Grv1g&t=1728s&ab_channel=KodeKloud
https://www.youtube.com/watch?v=XuSQU5Grv1g&t=314s

**Defination**
Kubernetes, also known as K8s, is an open source system for automating deployment, scaling, and management of containerized applications.
    > when we deploy the kubernetes we get a cluster
    > two important parts
        1) master(control plane)
        2) Worker nodes.
    **Features:**  
        1) container orchestration
        2) scalability
        3) load balancing
        4) high avalability
        5) Rollouts and Rollbacks 


**Componenets of Kubernetes** 
    Master Components
    1) API server - command line, need to check 
    2) ETCD -  key value store, having all cluster data
    3) Control manager - responsible for managing the state of the cluster
    4) scheduler -  assign node to newely created pods

    Worker Node components
    5) kubelet -  agent , make sure that containers running in pods
    6) kube proxy - maintains network rules for communication with pods
    7) container runtime - A tool responsible for running containers

**What is POD** 
    > A single instance of a running process in a cluster
    > it can run one or more containers and share the same resources  
    > container runs in a pods    
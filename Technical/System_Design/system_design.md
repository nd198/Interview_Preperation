**Consistence hashing**
Database SHarding
Load balancer
Microservice Architecture
Monolith Architecture
caching
CDN
event driven architechure
consistency: !)Eventually consistency 2) strong consistency


**Summary: Master-Slave vs. HBase Architecture(sharding/distributed)**
**Master-Slave Architecture**
    1)  Primary Goal : Replication: To create copies of data for read scaling and high availability/redundancy.
    2) Role of Master Node : The Master is the single source of truth. It handles all write operations.
    3) Role of Worker Nodes : Slaves hold a full copy of the master's data and primarily serve read requests.
    4) Data on Master Node : Holds 100% of the data.
    5) Data on Worker Nodes : Each Slave holds a full copy of the master's data.
    6) Write Path :	Centralized: All writes must go through the Master node first.
    7) Read Path :	Reads are typically directed to the Slaves to reduce load on the Master.
    8) Main Bottleneck:	The Master can become a write bottleneck since it has to handle all incoming writes.
    9) Master Failure :	Critical: The system cannot accept any new writes until a slave is promoted to a new master.
    10) Worker Failure	Low Impact: Read traffic is redirected to other slaves. The master continues accepting writes.
    11) Analogy	A Boss (Master) does all the work, with Assistants (Slaves) keeping identical copies to show others.

**HBase Architecture (Distribution/Sharding)**
    1)  Primary Goal : Sharding (Partitioning): To distribute massive datasets across many servers for write scaling.
    2) Role of Master Node : The HMaster is a coordinator/manager. It assigns data regions but does not handle data operations.
    3) Role of Worker Nodes : RegionServers are workers that hold a unique slice (a "Region") of the total data.
    4) Data on Master Node : Holds 0% of the data.
    5) Data on Worker Nodes : Each RegionServer holds a unique slice/partition of the total data..
    6) Write Path :	Decentralized: Writes go directly to the specific RegionServer that owns that piece of data. The HMaster is bypassed.
    7) Read Path :	Reads go directly to the specific RegionServer that holds the requested data.
    8) Main Bottleneck:	A specific RegionServer can become a "hotspot" if a single data range gets a disproportionate amount of traffic.
    9) Master Failure :	Critical: Non-Critical for Data: Reads and writes continue normally. Only administrative tasks (like creating tables or region balancing) are paused until the backup HMaster becomes active.
    10) Worker Failure	Low Impact: Managed Recovery: The HMaster detects the failure and re-assigns the failed server's data Regions to other active RegionServers.
    11) Analogy :	A Project Manager (HMaster) assigns tasks, while Writers (RegionServers) work on different, independent chapters of a book.

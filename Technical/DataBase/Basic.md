**CAP theorem**

**MySQL and NoSQL Database**
**When to Use Each**
**Choose a SQL database when:**
    > Your data is structured and its schema is stable.[1][4]
    > You need to perform complex queries and require multi-row transactions.[1]
    > Data consistency and integrity are critical (e.g., financial applications).[2]
    > You are working with legacy systems built on a relational structure.[1]

**Choose a NoSQL database when:**
    > You are working with large volumes of unstructured or semi-structured data.[3][17]
    > You need high performance, high availability, and the ability to scale quickly.[17][18]
    > Your application requires a flexible data model and is expected to evolve rapidly.[17]
    > You are building real-time web applications, mobile apps, or working with big data. 

**In-Depth Explanation**
**1. Data Model: How Data is Organized**
    **SQL Databases:**
        > SQL databases use a relational model where data is organized into tables.[1]
        > Each table consists of rows (records) and columns (attributes).[9][10]
        > This structure is akin to a well-organized spreadsheet, where each piece of data has a specific place.
        > Relationships between tables are established using foreign keys, ensuring data integrity.
    **NoSQL Databases:**
        > NoSQL databases are non-relational and can store data in various ways beyond tables.[1]
        > The main types of NoSQL data models are:
        > Document: Data is stored in JSON-like documents, which can be nested. This is a popular model for its flexibility.[3]
        > Key-Value: Data is stored as a simple collection of key-value pairs. This is a very simple and fast model.[3]
        > Wide-Column: Data is stored in tables with rows and dynamic columns. This is a hybrid between relational and key-value models.[11]
        > Graph: Data is stored as nodes and edges, representing relationships. This model is ideal for highly interconnected data.[3]  

**2. Schema: The Blueprint for Data**
    **SQL Databases:**
        > SQL databases have a predefined, or rigid, schema.[4]
        > This means you must define the structure of your data—the tables, columns, and data types—before you can insert any information.[2]
        > While this ensures data consistency and integrity, it can be inflexible if your data requirements change frequently.[4][6]
    **NoSQL Databases:**
        > NoSQL databases have dynamic or flexible schemas.[4][5]
        > You can add new fields to documents or change data structures on the fly without a predefined structure.[5]
        > This flexibility is highly beneficial for applications with evolving data requirements or those that handle diverse and unpredictable data types.[4]   

**3. Scalability: How they Handle Growth**
    **SQL Databases:**
        > SQL databases typically scale vertically.[3][4]
        > This means to handle more traffic, you increase the resources (CPU, RAM, storage) of a single server.
        > Vertical scaling can become expensive and has physical limitations.[3]
    **NoSQL Databases:**
        > NoSQL databases are designed to scale horizontally.[3][4]
        > This involves distributing the data and load across multiple servers, often referred to as "sharding".[1]
        > Horizontal scaling is generally more cost-effective and can handle massive amounts of data and traffic, making it well-suited for large-scale and cloud-based applications.[1][3] 

**4. Query Language: How You Interact with the Data**
    **SQL Databases:**
        > They use Structured Query Language (SQL), a standardized and powerful language for defining, manipulating, and querying data.[7][12]
        > SQL is a mature language with a large community and extensive support.
    **NoSQL Databases:**
        > There is no single, standard query language for NoSQL databases.[13]
        > The query language varies depending on the database.[6][7] Some use a syntax similar to SQL, while others have their own unique query languages or provide APIs for data access. 

**5. Consistency Model: Data Integrity vs. Availability**
    **SQL Databases:**
        > SQL databases prioritize strong consistency by adhering to the ACID properties (Atomicity, Consistency, Isolation, Durability).[15]
        > This guarantees that transactions are processed reliably, and the database is always in a consistent state. This is crucial for applications like banking and e-commerce where data integrity is paramount.
    **NoSQL Databases:**
        > NoSQL databases often prioritize availability and partition tolerance, following the principles of the CAP theorem.[6]
        > This often leads to a model of eventual consistency (often associated with the BASE model - Basically Available, Soft state, Eventual consistency).[16]
        > This means that for a short period, data across different nodes might be inconsistent, but it will eventually become consistent. This trade-off is acceptable for applications that need to be highly available, even in the face of network failures.[6]   

**ACID Properties in DB**   
    **1. Atomicity: All or Nothing**
        Atomicity dictates that a transaction must be treated as a single, indivisible unit. This means that either all of the operations within the transaction are successfully completed, or none of them are.[3][4] The system cannot be left in a state where only some of the operations have been executed.
        **How it works**: Databases typically implement atomicity using mechanisms like logs or journals to track changes. If a transaction is interrupted, the database can use the log to undo any partial changes, returning the database to its state before the transaction began.
    **2. Consistency: Sticking to the Rules**
        Consistency ensures that a transaction can only bring the database from one valid state to another. In other words, any data written to the database must be valid according to all defined rules, including constraints, cascades, and triggers.[1][7] This prevents illegal transactions from corrupting the database.
    **3. Isolation: Working in Parallel Without Interference**
        Isolation ensures that concurrently executing transactions do not interfere with each other. Each transaction must remain isolated from others to prevent data corruption.[9][10] It's as if each transaction is running in its own private workspace, and its changes are not visible to other transactions until it is complete.  
    **4. Durability: Once Saved, Always Saved**
        Durability guarantees that once a transaction has been successfully committed, its changes will survive permanently, even in the case of a system failure. This includes power outages, crashes, or other system errors. 
        **How it's achieved**: This is typically accomplished by writing the transaction's changes to non-volatile storage, like a hard drive or SSD.[17] A common technique is write-ahead logging (WAL), where all modifications are first written to a log file before being applied to the actual database files. In the event of a crash, the database can use this log to recover the committed changes.[18]  
    **The Two Main Types of Locks**
        **1. Shared Lock (S-Lock) or Read Lock**
            **Purpose**: A transaction acquires a Shared Lock when it wants to read data.
            **Rule**: Multiple transactions can hold a Shared Lock on the same piece of data simultaneously. This makes sense—there's no harm in multiple people reading the same data at the same time.
            **Analogy**: Several people can read the same library book at once while they are in the library.
        **2. Exclusive Lock (X-Lock) or Write Lock**
            **Purpose**: A transaction acquires an Exclusive Lock when it wants to modify (UPDATE, INSERT, or DELETE) data.
            **Rule**: Only one transaction can hold an Exclusive Lock on a piece of data at any given time. Furthermore, if one transaction has an Exclusive Lock, no other transaction can even get a Shared (read) Lock on it.
            **Analogy**: If you check out the library book to take it home and write notes in it, no one else can read or write in it until you return it.
        **The Complication: Deadlocks**
        Locking is powerful, but it introduces a new problem: the deadlock, also known as a "deadly embrace."
        A deadlock occurs when two (or more) transactions are waiting for each other to release locks.
        Deadlock Scenario:
        Transaction A starts and acquires an Exclusive Lock on the Customers table to update Alice's address.
        Transaction B starts and acquires an Exclusive Lock on the Orders table to add a new order for Alice.
        Now, Transaction A needs to update Alice's recent orders, so it requests a lock on the Orders table. But Transaction B holds that lock, so Transaction A waits.
        Simultaneously, Transaction B needs to verify Alice's customer info, so it requests a lock on the Customers table. But Transaction A holds that lock, so Transaction B waits.
        Result: Transaction A is waiting for B, and B is waiting for A. Neither can proceed. They are stuck forever.
        **How Databases Solve Deadlocks:**
        Databases have a built-in deadlock detector. This process periodically checks for these circular wait conditions. When it finds one, it chooses one transaction as the "victim," kills it, and rolls back all of its work. This releases its locks, allowing the other transaction to proceed. The application connected to the "victim" transaction will simply get an error and typically has to retry the transaction. 


**How DBMS indexing works**  
Link:- https://www.youtube.com/watch?v=6ZquiVH8AGU
    **How table data is actually stored**  
        > DBMS creates the data pages (generally its 8kb but depends on db to db)
        > each data page can store multiple table row in it  
        > Data page contains
            1) Header(96 byte) : page no, free space, checksum
            2) Data records(8060 byte) : Actual data is stored here
            3) Offset(36 byte) : Contains an array , each index of an array holds a pointer to corresponding data in the data records 
        > DBMS creates and manage these data pages, as for storing 1 table data , it can create many pages
        > these data pages ultimately stored in data block in physical memory in disk
        **what is data block**  
            > data block is minimum amount of data which  can be read/write by an IO operation
            > it is manage by underlying storage system like Disk, data block size can range from 4kb 32 kb(common size 8kb)
            > so based on data block size, it can hold 1 or many data page 
            > BDMS maintain the mapping of datapage and data block(1 data block can store the multiple data pages)
        **Note** - DBMS controls the data pages(like what rows goes in which page or sequence of the pages) but has no controls on data blocks(data block can scattered over the disk)
    **What type of indexing presents in RDMS**
        **Indexing** 
            > Indexing is used to performance of the database query, so that data can be fetched faster
            > without indexing , DBMS has to iterate each and every table row to find the requested data
            > i.e O(N), if there are millions of rows, query can take some time to fetch the data
        **Which data structure provides better time complexity then O(N).**  
            > B+tree, it provides O(log N) time complexity for insertion, searching and deletion
            **How B(Balanced) tree works**
                > it maintains sorted data
                > all leaf are at same level
                > M order B tree, means each node at most can have M childrens
                > and M-1 keys per node and M pointers.
        **Note**  - DBMS uses B+tree to manages it's data pages and rows within the pages  
        Root node or intemediery node hold the value which is used for fatser searching of data. possible that value might have deleted from db, but it can be used for sorting the tree. 
        Leaft node holds the index column value 
        **Types of Indexing** 
            **Clustered Indexing**
            -> order of rows inside the data pages, match with the order of the index 
            -> there can be only one clustered index can present / table bcoz ordering of pages can be done on index only
            -> if manually you have not specified any clustered index then DBMS looks for the primary key which is unique and not null and use it as a clustered key
            -> if in table there is no primary key available then internally it's creates a hidden column which is used as a clustered index (this column increse sequencially so guaranteed unique and not null)
            **Non Clustered Index**
    **How it search the data if we triggers the query**  
        > first load the index pages in the meomry  
        >  from the index pages it will run the B+tree to find which data page has the searches value
        > data page find the block
        > load that data block in memory
        > read the data

                          
            
                         



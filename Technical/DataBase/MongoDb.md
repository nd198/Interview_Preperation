**To check mongo in comand propmt**
> install mongo shell
> after installation check 
    "Mongosh"
> to chekc dbs 
    "show dbs;" or show databases
> to create the new database 
    use <database-name>;
> to delete the Database
    db.dropDatabase();
> to check all available collections    
    show collections;
> to create the collection    
    db.createCollection('<collection-name>’)
> to delete the collection
    db.<collection-name>.drop();

**Inserting Document in MongoDB**  
**To insert one**
    db.<collection-name>.insertOne({
        field1: value1,
        field2: value2,
        ...
    });

**To insert many**
    db.<collection-name>.insertMany([
        { field1: value1, field2: value2, ... },
        { field1: value1, field2: value2, ... }, 
        // ... 
    ]);
 
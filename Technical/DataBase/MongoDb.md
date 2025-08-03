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

**To find many Records** - find()
    db.collection_name.find({ key: value })

**To find one Records** - findOne()
    db.collection_name.findOne({ key: value }) 

**Importing JSON in MongoDB**
    > mongoimport jsonfile.json –d database_name –c collection_name
    > mongoimport products.json -d shop -c products
    > mongoimport products.json -d shop -c products --jsonArray (if data is is in array of object)
    > Here, --jsonArray accepts the import of data expressed with multiple MongoDB documents within a single JSON array

**Comparission Operator**  
    $eq, $lt, $ne, $lte, $gt, $in, $gte, $ni
    > db.collectionName.find({ 'fieldname': { $operator: value } }); // $eq
    > db.collectionName.find({ 'fieldname': {  $in: [249, 129, 39] } });

**Introduction to Cursors**
    Cursors in MongoDB are used to efficiently retrieve large result sets from queries, providing control over the data retrieval process.
 
    MongoDB retrieves query results in batches using cursors.Cursors are a pointer to the result set on the server.Cursors are used to iterate through query results

    **Cursor Methods**
        count(), sort(), limit(), skip()
        db.products.find({ price: { $gt: 250 } }).count();
        db.products.find({ price: { $gt: 250 } }).limit(5);
        db.products.find({ price: { $gt: 250 } }).limit(5).skip(2);
        db.products.find({ price: { $gt: 1250 } }'.limit(3).sort({ price: 1 });
        (1) for ascending and (-1) for descending

**Logical Operators**
    $and, $or, $not,  $nor
    { $and: [ { condition1 }, { condition2 }, ... ]
    { field: { $not: { operator: value } } }

**Complex Expressions**
    > The $expr operator allows using aggregation expressions within a query.
    > Useful when you need to compare fields from the same document in a more complex manner.
    **Syntax**
    { $expr: { operator: [field, value] } }
    **Example**
    db.products.find({ $expr: { $gt: ['$price', 100] } });

**Elements Operator**
    $exists : { field: { $exists: <boolean>} }
    $type : { field: { $type: "<bson-data-type>" } }
    $size : { field: { $size: <array-length> } }

**$all vs $elemMatch**
    **$all** : The $all operator selects the documents where the value of a field is an array 
    that contains all the specified elements.
    { <field>: { $all: [ <value1> , <value2> ... ] } }

    **$elemMatch** : The $elemMatch  operator matches documents that contain an array field with 
    at least one element that matches all the specified query criteria.
    { <field>: { $elemMatch: { <query1>, <query2>, ... } } }

**Update Operation MongoDB**   
    **updateOne() and updateMany()**
    `db.collectionName.updateOne(
    { filter },
    { $set: { existingField: newValue, newField: "new value", // ... }, }
    );
    
    db.collectionName.updateMany(
    { filter },
    { $set: { existingField: newValue, // ... }, }
    )`

**Removing and Renaming Fields**
    > db.collectionName.updateOne( { filter }, { $unset: { fieldName: 1 } } );

    > db.collectionName.updateOne(
    { filter },
    { $rename: { oldFieldName: "newFieldName" } }
    );

**Updating arrays and Embedded Documents**
    `db.collectionName.updateOne(
    { filter },
    { $push: { arrayField: "new element" } }
    );

    db.collectionName.updateOne(
    { filter },
    { $pop: { arrayField: value } }
    );
    
    db.collectionName.updateOne(
    { filter },
    { $set: { "arrayField.$.text": "Updated text" } }
    )`

**Delete Operations in MongoDB**
    > db.collectionName.deleteOne({ filter });
    > db.sales.deleteMany({ price: 55 });

    


 
 


 
    
 



 

 